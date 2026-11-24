import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { NivelEducativo, Prisma } from "@prisma/client";
import { PrismaService } from "../../database/prisma.service";
import { obtenerAnioActual, validarAnioLectivo } from "../anios-lectivos/anio-lectivo.regla";

@Injectable()
export class SeccionesService {
  constructor(private readonly prisma: PrismaService) {}

  listar() {
    return this.prisma.seccion.findMany({
      orderBy: [{ anio: "desc" }, { idCurso: "asc" }, { numero: "asc" }, { idSeccion: "asc" }],
    });
  }

  async crear(body: unknown, idUsuario: number) {
    const datos = this.validarDatos(body);
    validarAnioLectivo(datos.anio, await obtenerAnioActual(this.prisma));

    try {
      return await this.prisma.conAuditoria(idUsuario, async (tx) => {
        const curso = await tx.curso.findUnique({
          where: { idCurso: datos.idCurso },
          select: { nivel: true },
        });
        if (!curso) throw new NotFoundException("El curso no existe");

        const anio = await tx.anioLectivo.findUnique({ where: { anio: datos.anio } });
        if (!anio) throw new NotFoundException("El año lectivo no existe");

        if (datos.idBachillerato !== null) {
          if (curso.nivel !== NivelEducativo.MEDIA) {
            throw new BadRequestException("El bachillerato solo aplica a cursos de nivel MEDIA");
          }
          const bachillerato = await tx.bachillerato.findUnique({
            where: { idBachillerato: datos.idBachillerato },
          });
          if (!bachillerato) throw new NotFoundException("El bachillerato no existe");
        }

        return tx.seccion.create({ data: datos });
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ConflictException("Ya existe una sección para este curso, año, número y bachillerato");
        }
        if (error.code === "P2003") {
          throw new ConflictException("El curso o bachillerato dejó de estar disponible");
        }
      }
      throw error;
    }
  }

  async eliminar(idSeccion: number, idUsuario: number) {
    this.enteroPositivo(idSeccion, "id", 2147483647);

    try {
      try {
        await this.prisma.conAuditoria(idUsuario, (tx) => tx.seccion.delete({ where: { idSeccion } }));
        return { accion: "eliminada" };
      } catch (error) {
        // La clave foránea protege también las matrículas creadas concurrentemente.
        if (!(error instanceof Prisma.PrismaClientKnownRequestError) || error.code !== "P2003") {
          throw error;
        }
        const seccion = await this.prisma.conAuditoria(idUsuario, (tx) =>
          tx.seccion.update({ where: { idSeccion }, data: { activo: false } }),
        );
        return { accion: "desactivada", seccion };
      }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        throw new NotFoundException("La sección no existe");
      }
      throw error;
    }
  }

  private validarDatos(body: unknown) {
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      throw new BadRequestException("Debe enviar un objeto con los datos de la sección");
    }
    const datos = body as Record<string, unknown>;
    const campos = ["idCurso", "anio", "numero", "idBachillerato"];
    for (const campo of Object.keys(datos)) {
      if (!campos.includes(campo)) throw new BadRequestException(`Campo no permitido: ${campo}`);
    }

    return {
      idCurso: this.enteroPositivo(datos.idCurso, "idCurso", 2147483647),
      anio: this.enteroPositivo(datos.anio, "anio", 32767),
      numero: this.enteroPositivo(datos.numero, "numero", 32767),
      idBachillerato: datos.idBachillerato == null
        ? null
        : this.enteroPositivo(datos.idBachillerato, "idBachillerato", 2147483647),
    };
  }

  private enteroPositivo(valor: unknown, campo: string, maximo: number): number {
    if (typeof valor !== "number" || !Number.isInteger(valor) || valor < 1 || valor > maximo) {
      throw new BadRequestException(`${campo} debe ser un entero entre 1 y ${maximo}`);
    }
    return valor;
  }
}
