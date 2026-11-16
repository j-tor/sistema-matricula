import { Injectable } from '@nestjs/common';
import { obtenerAnioActual, validarAnioLectivo } from './anio-lectivo.regla';

@Injectable()
export class AniosLectivosService {
  /** Año actual según la fecha del servidor. */
  obtenerAnioActual(): number {
    return obtenerAnioActual();
  }

  /** Lanza un error 400 si el año es futuro. Usar antes de guardar cualquier año. */
  validarAnio(anio: number): number {
    return validarAnioLectivo(anio);
  }
}
