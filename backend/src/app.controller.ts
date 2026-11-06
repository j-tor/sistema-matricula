import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class AppController {
  @Get()
  getInfo() {
    return {
      message: 'API Sistema de Matrícula v1.0',
      endpoints: ['/health'],
    };
  }
}
