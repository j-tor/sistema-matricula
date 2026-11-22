import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AutenticacionController } from './autenticacion.controller';
import { AutenticacionService } from './autenticacion.service';
import { SesionGuard } from './sesion.guard';

@Module({
  controllers: [AutenticacionController],
  providers: [AutenticacionService, { provide: APP_GUARD, useClass: SesionGuard }],
  exports: [AutenticacionService],
})
export class AutenticacionModule {}
