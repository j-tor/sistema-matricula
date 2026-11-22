import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createHash, randomBytes } from 'node:crypto';
import { compare } from 'bcryptjs';
import { PrismaService } from '../../database/prisma.service';

const DURACION_SESION_MS = 8 * 60 * 60 * 1000;
// Mantiene el costo de bcrypt cuando no existe el usuario.
const HASH_AUXILIAR = '$2b$12$000000000000000000000O0000000000000000000000000000000';

const datosUsuario = {
  idUsuario: true,
  nombreCompleto: true,
  username: true,
  rol: true,
} as const;

@Injectable()
export class AutenticacionService {
  constructor(private readonly prisma: PrismaService) {}

  async iniciarSesion(username: string, password: string) {
    const cuenta = await this.prisma.usuario.findUnique({
      where: { username },
      select: { ...datosUsuario, activo: true, passwordHash: true },
    });
    const coincide = await compare(password, cuenta?.passwordHash ?? HASH_AUXILIAR);
    if (!cuenta?.activo || !coincide || Buffer.byteLength(password, 'utf8') > 72) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }

    const { activo, passwordHash, ...usuario } = cuenta;
    const token = randomBytes(32).toString('base64url');
    const ahora = new Date();
    const expiraEn = new Date(ahora.getTime() + DURACION_SESION_MS);
    await this.prisma.$transaction(async (db) => {
      const actualizados = await db.usuario.updateMany({
        where: { idUsuario: usuario.idUsuario, activo, passwordHash },
        data: { ultimoAcceso: ahora },
      });
      if (actualizados.count !== 1) {
        throw new UnauthorizedException('Usuario o contraseña incorrectos');
      }
      await db.sesion.deleteMany({
        where: { idUsuario: usuario.idUsuario, expiraEn: { lte: ahora } },
      });
      await db.sesion.create({
        data: { tokenHash: this.hashToken(token), idUsuario: usuario.idUsuario, expiraEn },
      });
    });
    return { token, expiraEn, usuario };
  }

  async obtenerUsuario(authorization?: string) {
    const sesion = await this.prisma.sesion.findFirst({
      where: {
        tokenHash: this.leerTokenHash(authorization),
        expiraEn: { gt: new Date() },
        usuario: { activo: true },
      },
      select: { usuario: { select: datosUsuario } },
    });
    if (!sesion) {
      throw new UnauthorizedException('Sesión inválida o expirada');
    }
    return sesion.usuario;
  }

  async cerrarSesion(authorization?: string) {
    await this.prisma.sesion.deleteMany({
      where: { tokenHash: this.leerTokenHash(authorization) },
    });
  }

  private leerTokenHash(authorization?: string) {
    const token = /^Bearer ([A-Za-z0-9_-]{43})$/i.exec(authorization ?? '')?.[1];
    if (!token) {
      throw new UnauthorizedException('Se requiere un token de sesión');
    }
    return this.hashToken(token);
  }

  private hashToken(token: string) {
    return createHash('sha256').update(token).digest('hex');
  }
}
