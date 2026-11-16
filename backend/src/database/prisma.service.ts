import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Cliente de Prisma inyectable. Usa la variable DATABASE_URL del archivo .env.
 * Se conecta al iniciar el módulo y cierra la conexión al detener la aplicación.
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
    });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }

  /** Verifica que la base de datos responda. Lanza un error si no hay conexión. */
  async ping(): Promise<void> {
    await this.$queryRaw`SELECT 1`;
  }
}
