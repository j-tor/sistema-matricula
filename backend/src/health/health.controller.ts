import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { PrismaService } from '../database/prisma.service';
import { RutaPublica } from '../modules/autenticacion/sesion.guard';

@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RutaPublica(true)
  @ApiOperation({ security: [] })
  async check() {
    try {
      await this.prisma.ping();
      return { status: 'ok', db: 'connected' };
    } catch (error: unknown) {
      throw new HttpException(
        {
          status: 'error',
          db: 'disconnected',
          message: error instanceof Error ? error.message : 'Error de conexión',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
