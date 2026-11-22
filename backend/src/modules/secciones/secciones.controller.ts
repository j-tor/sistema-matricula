import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { ApiBody, ApiConflictResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UsuarioActual, UsuarioSesion } from "../autenticacion/sesion.guard";
import { SeccionesService } from "./secciones.service";

@ApiTags("Secciones")
@Controller("api/secciones")
export class SeccionesController {
  constructor(private readonly secciones: SeccionesService) {}

  @Get()
  @ApiOperation({ summary: "Listar las secciones por año, curso y número" })
  listar() {
    return this.secciones.listar();
  }

  @Post()
  @ApiOperation({ summary: "Crear una sección para un curso y año lectivo" })
  @ApiConflictResponse({ description: "Ya existe una sección con la misma combinación" })
  @ApiBody({
    schema: {
      type: "object",
      additionalProperties: false,
      required: ["idCurso", "anio", "numero"],
      properties: {
        idCurso: { type: "integer", minimum: 1, example: 1 },
        anio: { type: "integer", minimum: 1, maximum: 32767, example: 2026 },
        numero: { type: "integer", minimum: 1, maximum: 32767, example: 2 },
        idBachillerato: { type: "integer", minimum: 1, nullable: true },
      },
    },
  })
  crear(@Body() body: unknown, @UsuarioActual() usuario: UsuarioSesion) {
    return this.secciones.crear(body, usuario.idUsuario);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Eliminar una sección o desactivarla si tiene matrículas" })
  eliminar(@Param("id", ParseIntPipe) id: number, @UsuarioActual() usuario: UsuarioSesion) {
    return this.secciones.eliminar(id, usuario.idUsuario);
  }
}
