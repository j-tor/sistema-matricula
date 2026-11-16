import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AnioFuturoFilter } from './anio-futuro.filter';
import { AniosLectivosController } from './anios-lectivos.controller';
import { AniosLectivosService } from './anios-lectivos.service';

@Module({
  controllers: [AniosLectivosController],
  providers: [
    AniosLectivosService,
    // Filtro global: traduce el rechazo de la base de datos a un error 400
    { provide: APP_FILTER, useClass: AnioFuturoFilter },
  ],
  exports: [AniosLectivosService],
})
export class AniosLectivosModule {}
