import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { ClsService } from 'nestjs-cls';
import { isObservable, lastValueFrom } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private cls: ClsService, // ⬅️ AJOUT
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const canActivateResult = super.canActivate(context);

    let result: boolean;
    if (isObservable(canActivateResult)) {
      result = await lastValueFrom(canActivateResult);
    } else {
      result = await canActivateResult;
    }

    if (result) {
      const request = context.switchToHttp().getRequest();
      const userId = request.user?.sub ?? request.user?.id;

      if (userId) {
        this.cls.set('userId', String(userId));
      }
    }

    return result;
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      console.error("❌ [JwtAuthGuard] Erreur :", err);
      console.error("❌ [JwtAuthGuard] Info Passport :", info);
      throw err || new UnauthorizedException('Token invalide ou expiré');
    }
    return user;
  }
}