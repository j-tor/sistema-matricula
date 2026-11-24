import { BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

export const MENSAJE_ANIO_FUTURO = 'No se permiten años lectivos futuros';

export async function obtenerAnioActual(prisma: PrismaService): Promise<number> {
  // Usa la misma zona horaria que el trigger de matrícula y secciones.
  const [resultado] = await prisma.$queryRaw<{ anio: number }[]>`
    SELECT EXTRACT(YEAR FROM (now() AT TIME ZONE 'America/Tegucigalpa'))::int AS anio
  `;
  return resultado.anio;
}

export function validarAnioLectivo(anio: number, anioActual: number): number {
  if (anio > anioActual) {
    throw new BadRequestException(MENSAJE_ANIO_FUTURO);
  }
  return anio;
}
