import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { validarAnioLectivo } from './anio-lectivo.regla';

/**
 * Pipe reutilizable para parámetros o campos de año lectivo.
 * Convierte el valor a número y rechaza años no válidos o futuros.
 *
 * Uso: `@Param('anio', AnioLectivoPipe) anio: number`
 */
@Injectable()
export class AnioLectivoPipe implements PipeTransform<unknown, number> {
  transform(valor: unknown): number {
    const anio = typeof valor === 'string' && valor.trim() !== '' ? Number(valor) : valor;

    if (typeof anio !== 'number' || !Number.isInteger(anio)) {
      throw new BadRequestException('El año lectivo debe ser un número entero');
    }

    return validarAnioLectivo(anio);
  }
}
