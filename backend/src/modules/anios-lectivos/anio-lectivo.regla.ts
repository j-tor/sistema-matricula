import { BadRequestException } from '@nestjs/common';

/** Mensaje que se muestra cuando se intenta guardar un año mayor al actual. */
export const MENSAJE_ANIO_FUTURO = 'No se permiten años lectivos futuros';

/** Zona horaria usada para calcular el año actual (configurable con ZONA_HORARIA). */
export function obtenerZonaHoraria(): string {
  return process.env.ZONA_HORARIA || 'America/Tegucigalpa';
}

/**
 * Devuelve el año actual según la fecha del servidor en la zona horaria del sistema.
 * El año nunca se escribe fijo en el código: se calcula en cada llamada.
 */
export function obtenerAnioActual(fecha: Date = new Date()): number {
  const anio = new Intl.DateTimeFormat('en-US', {
    timeZone: obtenerZonaHoraria(),
    year: 'numeric',
  }).format(fecha);
  return Number(anio);
}

/** Indica si el año es posterior al año actual del servidor. */
export function esAnioFuturo(anio: number, fecha: Date = new Date()): boolean {
  return anio > obtenerAnioActual(fecha);
}

/**
 * Valida que el año lectivo sea el actual o uno anterior.
 * Lanza un error 400 con el mensaje «No se permiten años lectivos futuros».
 */
export function validarAnioLectivo(anio: number, fecha: Date = new Date()): number {
  if (esAnioFuturo(anio, fecha)) {
    throw new BadRequestException(MENSAJE_ANIO_FUTURO);
  }
  return anio;
}
