import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../../database/prisma.service";
import { obtenerAnioActual, validarAnioLectivo } from "./anio-lectivo.regla";

@Injectable()
export class AniosLectivosService {
  constructor(private readonly prisma: PrismaService) {}

  obtenerAnioActual(): Promise<number> {
    return obtenerAnioActual(this.prisma);
  }

  async validarAnio(anio: number): Promise<number> {
    return validarAnioLectivo(anio, await this.obtenerAnioActual());
  }

  async listar() {
    return this.prisma.anioLectivo.findMany({
      orderBy: { anio: "desc" },
    });
  }

  async obtener(anio: number) {
    const registro = await this.prisma.anioLectivo.findUnique({
      where: { anio },
    });

    if (!registro) {
      throw new NotFoundException("El año lectivo no existe");
    }

    return registro;
  }

  async crear(body: unknown, idUsuario: number) {
    const datos = this.validarObjeto(body);
    this.validarCampos(datos, ["anio", "activo"]);

    const anio = await this.validarAnioEntrada(datos.anio);
    const activo = datos.activo ?? true;

    if (typeof activo !== "boolean") {
      throw new BadRequestException(
        "El estado activo debe ser verdadero o falso",
      );
    }

    try {
      return await this.prisma.conAuditoria(idUsuario, (tx) => tx.anioLectivo.create({
        data: { anio, activo },
      }));
    } catch (error) {
      this.manejarError(error);
      throw error;
    }
  }

  async actualizar(anioActual: number, body: unknown, idUsuario: number) {
    const datos = this.validarObjeto(body);
    this.validarCampos(datos, ["anio", "activo"]);

    if (Object.keys(datos).length === 0) {
      throw new BadRequestException(
        "Debe proporcionar al menos un campo para actualizar",
      );
    }

    const nuevoAnio =
      datos.anio === undefined
        ? anioActual
        : await this.validarAnioEntrada(datos.anio);

    const activo = datos.activo;

    if (activo !== undefined && typeof activo !== "boolean") {
      throw new BadRequestException(
        "El estado activo debe ser verdadero o falso",
      );
    }

    try {
      return await this.prisma.conAuditoria(idUsuario, async (tx) => {
        const existente = await tx.anioLectivo.findUnique({
          where: { anio: anioActual },
        });

        if (!existente) {
          throw new NotFoundException("El año lectivo no existe");
        }

        if (nuevoAnio !== anioActual) {
          const [seccion, matricula, destino] = await Promise.all([
            tx.seccion.findFirst({
              where: { anio: anioActual },
              select: { anio: true },
            }),
            tx.matricula.findFirst({
              where: { anio: anioActual },
              select: { anio: true },
            }),
            tx.anioLectivo.findUnique({
              where: { anio: nuevoAnio },
              select: { anio: true },
            }),
          ]);

          if (seccion || matricula) {
            throw new ConflictException(
              "No se puede cambiar el año porque tiene secciones o matrículas asociadas",
            );
          }

          if (destino) {
            throw new ConflictException("Ya existe un año lectivo con ese año");
          }
        }

        return tx.anioLectivo.update({
          where: { anio: anioActual },
          data: {
            ...(nuevoAnio !== anioActual ? { anio: nuevoAnio } : {}),
            ...(activo !== undefined ? { activo } : {}),
          },
        });
      });
    } catch (error) {
      this.manejarError(error);
      throw error;
    }
  }

  async cambiarEstado(anio: number, body: unknown, idUsuario: number) {
    const datos = this.validarObjeto(body);
    this.validarCampos(datos, ["activo"]);

    if (typeof datos.activo !== "boolean") {
      throw new BadRequestException(
        "Debe indicar activo como verdadero o falso",
      );
    }

    const activo = datos.activo;
    await this.obtener(anio);

    return this.prisma.conAuditoria(idUsuario, (tx) => tx.anioLectivo.update({
      where: { anio },
      data: { activo },
    }));
  }

  private async validarAnioEntrada(valor: unknown): Promise<number> {
    if (
      typeof valor !== "number" ||
      !Number.isInteger(valor) ||
      valor < 1 ||
      valor > 32767
    ) {
      throw new BadRequestException(
        "El año lectivo debe ser un número entero válido",
      );
    }

    return this.validarAnio(valor);
  }

  private validarObjeto(body: unknown): Record<string, unknown> {
    if (body === null || typeof body !== "object" || Array.isArray(body)) {
      throw new BadRequestException(
        "Debe enviar un objeto con los datos del año lectivo",
      );
    }

    return body as Record<string, unknown>;
  }

  private validarCampos(
    datos: Record<string, unknown>,
    permitidos: string[],
  ): void {
    const desconocidos = Object.keys(datos).filter(
      (campo) => !permitidos.includes(campo),
    );

    if (desconocidos.length > 0) {
      throw new BadRequestException(
        `Campos no permitidos: ${desconocidos.join(", ")}`,
      );
    }
  }

  private manejarError(error: unknown): void {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new ConflictException("Ya existe un año lectivo con ese año");
      }

      if (error.code === "P2025") {
        throw new NotFoundException("El año lectivo no existe");
      }
    }
  }
}
