// src/common/interceptors/format-response.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResponse } from '../interfaces/response.interface';

@Injectable()
export class FormatResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<IResponse> {
    return next.handle().pipe(
      map((data) => {
        // Si la réponse est déjà formatée (ex: renvoyée manuellement depuis le contrôleur), on la laisse telle quelle
        if (data && typeof data === 'object' && 'success' in data && 'message' in data) {
          return data as IResponse;
        }

        // Sinon, on formate automatiquement
        return {
          success: true,
          data: data ?? null, // Met null si data est undefined
          message: data?.message || 'Opération réussie', // Permet au contrôleur de surcharger le message s'il renvoie un objet avec un champ "message"
        };
      }),
    );
  }
}