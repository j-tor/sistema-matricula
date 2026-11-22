import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { DatabaseModule } from "./database/database.module";
import { HealthModule } from "./health/health.module";
import { AniosLectivosModule } from "./modules/anios-lectivos/anios-lectivos.module";
import { CursosModule } from "./modules/cursos/cursos.module";
import { AutenticacionModule } from "./modules/autenticacion/autenticacion.module";
import { SeccionesModule } from "./modules/secciones/secciones.module";

@Module({
  imports: [DatabaseModule, HealthModule, AniosLectivosModule, CursosModule, AutenticacionModule, SeccionesModule],
  controllers: [AppController],
})
export class AppModule {}
