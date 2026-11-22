import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Header,
  Headers,
  HttpCode,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AutenticacionService } from './autenticacion.service';
import { RutaPublica, UsuarioActual, UsuarioSesion } from './sesion.guard';

@ApiTags('Autenticación')
@Controller('api/autenticacion')
export class AutenticacionController {
  constructor(private readonly autenticacion: AutenticacionService) {}

  @Post('login')
  @RutaPublica(true)
  @ApiOperation({ summary: 'Iniciar sesión', security: [] })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['username', 'password'],
      properties: { username: { type: 'string' }, password: { type: 'string', format: 'password' } },
    },
  })
  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
  login(@Body() datos?: { username?: unknown; password?: unknown }) {
    const username = typeof datos?.username === 'string' ? datos.username.trim() : '';
    const password = datos?.password;
    if (!username || username.length > 30 || typeof password !== 'string' || !password) {
      throw new BadRequestException('Ingresa un usuario y una contraseña válidos');
    }
    return this.autenticacion.iniciarSesion(username, password);
  }

  @Get('sesion')
  @Header('Cache-Control', 'no-store')
  sesion(@UsuarioActual() usuario: UsuarioSesion) {
    return usuario;
  }

  @Post('logout')
  @HttpCode(204)
  logout(@Headers('authorization') authorization?: string) {
    return this.autenticacion.cerrarSesion(authorization);
  }
}
