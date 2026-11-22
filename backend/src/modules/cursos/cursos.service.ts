import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { NivelEducativo, Prisma } from "@prisma/client";
import { PrismaService } from "../../database/prisma.service";

type DatosCurso = {
  codigo?: string;
  nombre?: string;
  nivel?: NivelEducativo;
  activo?: boolean;
};

@Injectable()
export class CursosService {
  constructor(private readonly prisma: PrismaService) {}

  async listar() {
    return this.prisma.curso.findMany({
      orderBy: { idCurso: "asc" },
    });
  }

  async obtener(idCurso: number) {
    const curso = await this.prisma.curso.findUnique({
      where: { idCurso },
    });

    if (!curso) {
      throw new NotFoundException("El curso no existe");
    }

    return curso;
  }

  async crear(body: unknown, idUsuario: number) {
    const { codigo, nombre, nivel, activo } = this.validarDatos(body);

    if (!codigo || !nombre || !nivel) {
      throw new BadRequestException("Código, nombre y nivel son obligatorios");
    }

    try {
      return await this.prisma.conAuditoria(idUsuario, (tx) => tx.curso.create({
        data: { codigo, nombre, nivel, activo: activo ?? true },
      }));
    } catch (error) {
      this.manejarError(error);
      throw error;
    }
  }

  async actualizar(idCurso: number, body: unknown, idUsuario: number) {
    const datos = this.validarDatos(body);

    if (Object.keys(datos).length === 0) {
      throw new BadRequestException(
        "Debe proporcionar al menos un campo para actualizar",
      );
    }

    await this.obtener(idCurso);

    try {
      return await this.prisma.conAuditoria(idUsuario, (tx) => tx.curso.update({
        where: { idCurso },
        data: datos,
      }));
    } catch (error) {
      this.manejarError(error);
      throw error;
    }
  }

  async eliminar(idCurso: number, idUsuario: number) {
    const curso = await this.prisma.curso.findUnique({
      where: { idCurso },
      include: {
        _count: {
          select: { secciones: true },
        },
      },
    });

    if (!curso) {
      throw new NotFoundException("El curso no existe");
    }

    if (curso._count.secciones > 0) {
      const actualizado = await this.prisma.conAuditoria(idUsuario, (tx) => tx.curso.update({
        where: { idCurso },
        data: { activo: false },
      }));

      return {
        mensaje:
          "El curso tiene secciones asociadas. Se desactivó para conservar el historial",
        curso: actualizado,
      };
    }

    try {
      await this.prisma.conAuditoria(idUsuario, (tx) => tx.curso.delete({
        where: { idCurso },
      }));

      return {
        mensaje: "Curso eliminado correctamente",
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2003"
      ) {
        const actualizado = await this.prisma.conAuditoria(idUsuario, (tx) => tx.curso.update({
          where: { idCurso },
          data: { activo: false },
        }));

        return {
          mensaje: "El curso tiene registros relacionados y fue desactivado",
          curso: actualizado,
        };
      }
      this.manejarError(error);
      throw error;
    }
  }

  private validarDatos(body: unknown): DatosCurso {
    if (body === null || typeof body !== "object" || Array.isArray(body)) {
      throw new BadRequestException(
        "Debe enviar un objeto con los datos del curso",
      );
    }

    const entrada = body as Record<string, unknown>;
    const datos: DatosCurso = {};
    const permitidos = ["codigo", "nombre", "nivel", "activo"];

    for (const campo of Object.keys(entrada)) {
      if (!permitidos.includes(campo)) {
        throw new BadRequestException(`Campo no permitido: ${campo}`);
      }
    }

    if ("codigo" in entrada) {
      if (
        typeof entrada.codigo !== "string" ||
        entrada.codigo.trim().length === 0 ||
        entrada.codigo.trim().length > 5
      ) {
        throw new BadRequestException(
          "El código del curso debe tener entre 1 y 5 caracteres",
        );
      }
      datos.codigo = entrada.codigo.trim();
    }

    if ("nombre" in entrada) {
      if (
        typeof entrada.nombre !== "string" ||
        entrada.nombre.trim().length === 0 ||
        entrada.nombre.trim().length > 20
      ) {
        throw new BadRequestException(
          "El nombre del curso debe tener entre 1 y 20 caracteres",
        );
      }
      datos.nombre = entrada.nombre.trim();
    }

    if ("nivel" in entrada) {
      if (
        entrada.nivel !== NivelEducativo.BASICA &&
        entrada.nivel !== NivelEducativo.MEDIA
      ) {
        throw new BadRequestException("El nivel debe ser BASICA o MEDIA");
      }
      datos.nivel = entrada.nivel;
    }

    if ("activo" in entrada) {
      if (typeof entrada.activo !== "boolean") {
        throw new BadRequestException(
          "El estado activo debe ser verdadero o falso",
        );
      }
      datos.activo = entrada.activo;
    }
    return datos;
  }

  private manejarError(error: unknown): void {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new ConflictException("Ya existe un curso con ese código");
      }

      if (error.code === "P2025") {
        throw new NotFoundException("El curso no existe");
      }

      if (error.code === "P2003") {
        throw new ConflictException("El curso tiene registros relacionados");
      }
    }
  }
}
