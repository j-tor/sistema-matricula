import "reflect-metadata";
import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL || "http://localhost:5174",
    credentials: true,
  });

  app.enableShutdownHooks();

  const config = new DocumentBuilder()
    .setTitle("Sistema de Matrícula Estudiantil")
    .setDescription(
      "Documentación de la API REST del Sistema de Matrícula Estudiantil.",
    )
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);
  await app.listen(Number(process.env.PORT || 3005));
}

bootstrap().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
