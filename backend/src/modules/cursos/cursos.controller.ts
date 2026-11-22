import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UsuarioActual } from "../autenticacion/sesion.guard";
import { CursosService } from "./cursos.service";

@ApiTags("Cursos")
@Controller("api/cursos")
export class CursosController {
  constructor(private readonly cursosService: CursosService) {}

  @Get()
  @ApiOperation({ summary: "Listar todos los cursos" })
  listar() {
    return this.cursosService.listar();
  }

  @Get(":id")
  @ApiOperation({ summary: "Consultar un curso por ID" })
  obtener(@Param("id", ParseIntPipe) id: number) {
    return this.cursosService.obtener(id);
  }

  @Post()
  @ApiOperation({ summary: "Crear un curso" })
  @ApiBody({
    schema: {
      type: "object",
      required: ["codigo", "nombre", "nivel"],
      properties: {
        codigo: { type: "string", example: "7mo" },
        nombre: { type: "string", example: "Séptimo" },
        nivel: {
          type: "string",
          enum: ["BASICA", "MEDIA"],
          example: "BASICA",
        },
        activo: { type: "boolean", example: true },
      },
    },
  })
  crear(@Body() body: unknown, @UsuarioActual() usuario: { idUsuario: number }) {
    return this.cursosService.crear(body, usuario.idUsuario);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Editar un curso" })
  @ApiBody({
    schema: {
      type: "object",
      minProperties: 1,
      properties: {
        codigo: { type: "string", example: "7mo" },
        nombre: { type: "string", example: "Séptimo" },
        nivel: {
          type: "string",
          enum: ["BASICA", "MEDIA"],
        },
        activo: { type: "boolean", example: true },
      },
    },
  })
  actualizar(@Param("id", ParseIntPipe) id: number, @Body() body: unknown, @UsuarioActual() usuario: { idUsuario: number }) {
    return this.cursosService.actualizar(id, body, usuario.idUsuario);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Eliminar o desactivar un curso según sus relaciones",
  })
  eliminar(@Param("id", ParseIntPipe) id: number, @UsuarioActual() usuario: { idUsuario: number }) {
    return this.cursosService.eliminar(id, usuario.idUsuario);
  }
}
