import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { validarAnioLectivo } from "./anio-lectivo.regla";

@Injectable()
export class AnioLectivoPipe implements PipeTransform<unknown, number> {
  transform(valor: unknown): number {
    const anio =
      typeof valor === "string" && valor.trim() !== "" ? Number(valor) : valor;

    if (typeof anio !== "number" || !Number.isInteger(anio)) {
      throw new BadRequestException("El año lectivo debe ser un número entero");
    }

    if (anio < 1 || anio > 32767) {
      throw new BadRequestException(
        "El año lectivo debe estar entre 1 y 32767",
      );
    }

    return validarAnioLectivo(anio);
  }
}
