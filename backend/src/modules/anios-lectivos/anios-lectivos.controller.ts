import { Controller, Get } from '@nestjs/common';
import { AniosLectivosService } from './anios-lectivos.service';

@Controller('api/anios-lectivos')
export class AniosLectivosController {
  constructor(private readonly aniosLectivos: AniosLectivosService) {}

  /** Devuelve el año actual del servidor para que el frontend no dependa del reloj del navegador. */
  @Get('actual')
  obtenerActual() {
    return { anioActual: this.aniosLectivos.obtenerAnioActual() };
  }
}
