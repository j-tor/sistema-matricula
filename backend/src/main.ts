import 'reflect-metadata';
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5174',
    credentials: true,
  });
  app.enableShutdownHooks();
  await app.listen(Number(process.env.PORT || 3005));
}

bootstrap().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
