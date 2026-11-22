import {
  CanActivate, createParamDecorator, ExecutionContext, Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AutenticacionService } from "./autenticacion.service";

export const RutaPublica = Reflector.createDecorator<boolean>();

export type UsuarioSesion = Awaited<ReturnType<AutenticacionService["obtenerUsuario"]>>;
type Peticion = { headers: { authorization?: string }; usuario: UsuarioSesion };

export const UsuarioActual = createParamDecorator(
  (_: unknown, contexto: ExecutionContext) =>
    contexto.switchToHttp().getRequest<Peticion>().usuario,
);

@Injectable()
export class SesionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly autenticacion: AutenticacionService,
  ) {}

  async canActivate(contexto: ExecutionContext) {
    if (this.reflector.getAllAndOverride(RutaPublica, [contexto.getHandler(), contexto.getClass()])) {
      return true;
    }
    const peticion = contexto.switchToHttp().getRequest<Peticion>();
    peticion.usuario = await this.autenticacion.obtenerUsuario(peticion.headers.authorization);
    return true;
  }
}
