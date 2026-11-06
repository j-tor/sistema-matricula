import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Controller('health')
export class HealthController {
  constructor(private readonly database: DatabaseService) {}

  @Get()
  async check() {
    try {
      await this.database.authenticate();
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
