// import {
//   Injectable,
//   ExecutionContext,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { Reflector } from '@nestjs/core';
// import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
// import { ClsService } from 'nestjs-cls';
// import { isObservable, lastValueFrom } from 'rxjs'; // ⬅️ 1. Import rxjs

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {
//   constructor(
//     private reflector: Reflector,
//     private cls: ClsService,
//   ) {
//     super();
//   }

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     // 1. Vérifier si la route est marquée comme publique
//     const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);

//     if (isPublic) {
//       return true;
//     }

//     // 2. ⬇️ Récupérer le résultat de Passport (peut être boolean | Promise | Observable)
//     const canActivateResult = super.canActivate(context);

//     // 3. ⬇️ Convertir en boolean de manière fiable
//     let result: boolean;
//     if (isObservable(canActivateResult)) {
//       result = await lastValueFrom(canActivateResult);
//     } else {
//       result = await canActivateResult;
//     }

//     // 4. SI AUTHENTIFIÉ : récupérer l'ID et l'injecter dans le contexte CLS
//     if (result) {
//       const request = context.switchToHttp().getRequest();
//       const userId = request.user?.sub ?? request.user?.id;
//       console.log("_____________________________________________")
//       console.log("     JwtAuthGuard  request:",request)
//       console.log("     JwtAuthGuard  userId:",userId)
//       console.log("_____________________________________________")  
//       if (userId) {
//         this.cls.set('userId', String(userId));
//       }
//     }

//     return result;
//   }

//   handleRequest(err: any, user: any, info: any) {
//     if (err || !user) {
//       console.error("❌ [JwtAuthGuard] Erreur :", err);
//       console.error("❌ [JwtAuthGuard] Info Passport :", info);
//       throw err || new UnauthorizedException('Token invalide ou expiré');
//     }
//     return user;
//   }
// }