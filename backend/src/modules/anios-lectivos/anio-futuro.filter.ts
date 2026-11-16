import { ArgumentsHost, BadRequestException, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { MENSAJE_ANIO_FUTURO } from './anio-lectivo.regla';

/**
 * Convierte el rechazo del trigger de PostgreSQL («No se permiten años lectivos futuros»)
 * en una respuesta 400 con ese mensaje. Cualquier otro error sigue el manejo normal de NestJS.
 */
@Catch(Prisma.PrismaClientUnknownRequestError, Prisma.PrismaClientKnownRequestError)
export class AnioFuturoFilter extends BaseExceptionFilter {
  catch(error: Error, host: ArgumentsHost): void {
    if (error.message.includes(MENSAJE_ANIO_FUTURO)) {
      super.catch(new BadRequestException(MENSAJE_ANIO_FUTURO), host);
      return;
    }
    super.catch(error, host);
  }
}
