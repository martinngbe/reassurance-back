import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppLogger } from '../logger/app-logger.service';
import { v4 as uuidv4 } from 'uuid';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    private readonly logger: AppLogger,
    @Inject(REQUEST) private readonly request: any,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const className = context.getClass().name;
    const methodName = context.getHandler().name;
    
    // Génération ou récupération d'un Correlation ID (pour tracer une requête dans les microservices)
    const correlationId = this.request.headers['x-correlation-id'] || uuidv4();
    this.request.headers['x-correlation-id'] = correlationId;

    const now = Date.now();
    const meta = { correlationId };

    // Log d'entrée (Optionnel, peut être bruyant en prod)
    this.logger.log(`Request Incoming`, className, methodName, meta);

    return next.handle().pipe(
      tap(() => {
        const executionTime = Date.now() - now;
        this.logger.log(
          `Request Processed`,
          className,
          methodName,
          { ...meta, executionTimeMs: executionTime }
        );
      }),
      catchError((err) => {
        const executionTime = Date.now() - now;
        this.logger.error(
          `Request Failed: ${err.message}`,
          err.stack,
          className,
          methodName,
          { ...meta, executionTimeMs: executionTime, statusCode: err.status || 500 }
        );
        return throwError(() => err);
      }),
    );
  }
}