import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
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
