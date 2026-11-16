import { Module } from '@nestjs/common';
import { AniosLectivosController } from './anios-lectivos.controller';
import { AniosLectivosService } from './anios-lectivos.service';

@Module({
  controllers: [AniosLectivosController],
  providers: [AniosLectivosService],
  exports: [AniosLectivosService],
})
export class AniosLectivosModule {}
