import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';
import { AniosLectivosModule } from './modules/anios-lectivos/anios-lectivos.module';

@Module({
  imports: [DatabaseModule, HealthModule, AniosLectivosModule],
  controllers: [AppController],
})
export class AppModule {}
