import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';
import { AniosLectivosModule } from './modules/anios-lectivos/anios-lectivos.module';
import { AutenticacionModule } from './modules/autenticacion/autenticacion.module';

@Module({
  imports: [DatabaseModule, HealthModule, AniosLectivosModule, AutenticacionModule],
  controllers: [AppController],
})
export class AppModule {}
