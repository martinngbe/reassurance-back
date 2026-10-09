import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 1. Vérifier si la route est marquée comme publique
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // 2. Si publique, laisser passer sans validation JWT
    if (isPublic) {
      return true;
    }

    // 3. Sinon, appliquer la validation JWT normale
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      // 👇 AJOUTE CES LOGS pour voir la raison exacte du rejet par Passport
      console.error("❌ [JwtAuthGuard] Erreur :", err);
      console.error("❌ [JwtAuthGuard] Info Passport :", info); 
      throw err || new UnauthorizedException('Token invalide ou expiré');
    }
    return user;
  }
}