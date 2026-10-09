import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Vérifier si la route est publique
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si c'est public, on ne vérifie PAS les rôles (car il n'y a pas d'utilisateur connecté)
    if (isPublic) {
      return true;
    }

    // 2. Récupérer les rôles requis pour cette route
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // Si aucun rôle spécifique n'est requis, on laisse passer (tant que le JWT est valide)
    if (!requiredRoles) {
      return true;
    }

    // 3. Vérifier les rôles de l'utilisateur connecté
    const { user } = context.switchToHttp().getRequest();

    if (!user || !user.roles) {
      throw new ForbiddenException('Utilisateur non authentifié ou sans rôles');
    }

    const userRolesCodes = user.roles.map((role: any) => role.code);
    
    // L'utilisateur doit avoir AU MOINS UN des rôles requis
    const hasRole = requiredRoles.some((role) => userRolesCodes.includes(role));

    if (!hasRole) {
      throw new ForbiddenException(
        `Accès refusé. Rôles requis : ${requiredRoles.join(', ')}`,
      );
    }

    return true;
  }
}