import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AniosLectivosService } from "./anios-lectivos.service";
import { AnioLectivoPipe } from "./anio-lectivo.pipe";

@ApiTags("Años lectivos")
@Controller("api/anios-lectivos")
export class AniosLectivosController {
  constructor(private readonly aniosLectivos: AniosLectivosService) {}

  @Get()
  @ApiOperation({ summary: "Listar todos los años lectivos" })
  listar() {
    return this.aniosLectivos.listar();
  }

  @Get("actual")
  @ApiOperation({ summary: "Obtener el año lectivo actual" })
  obtenerActual() {
    return {
      anioActual: this.aniosLectivos.obtenerAnioActual(),
    };
  }

  @Get(":anio")
  @ApiOperation({ summary: "Consultar un año lectivo" })
  obtener(@Param("anio", AnioLectivoPipe) anio: number) {
    return this.aniosLectivos.obtener(anio);
  }

  @Post()
  @ApiOperation({ summary: "Crear un año lectivo" })
  @ApiBody({
    schema: {
      type: "object",
      required: ["anio"],
      properties: {
        anio: { type: "integer", example: 2026 },
        activo: { type: "boolean", example: true },
      },
    },
  })
  crear(@Body() body: unknown) {
    return this.aniosLectivos.crear(body);
  }

  @Patch(":anio/estado")
  @ApiOperation({ summary: "Activar o desactivar un año lectivo" })
  @ApiBody({
    schema: {
      type: "object",
      required: ["activo"],
      properties: {
        activo: { type: "boolean", example: false },
      },
    },
  })
  cambiarEstado(
    @Param("anio", AnioLectivoPipe) anio: number,
    @Body() body: unknown,
  ) {
    return this.aniosLectivos.cambiarEstado(anio, body);
  }

  @Patch(":anio")
  @ApiOperation({ summary: "Editar un año lectivo" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        anio: { type: "integer", example: 2025 },
        activo: { type: "boolean", example: true },
      },
      minProperties: 1,
    },
  })
  actualizar(
    @Param("anio", AnioLectivoPipe) anio: number,
    @Body() body: unknown,
  ) {
    return this.aniosLectivos.actualizar(anio, body);
  }
}
