import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppLogger } from '../logger/app-logger.service';
import { v4 as uuidv4 } from 'uuid';
import { UAParser } from 'ua-parser-js'; // User-Agent Parser

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: AppLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const className = context.getClass().name;
    const methodName = context.getHandler().name;
    const request = context.switchToHttp().getRequest();

    const correlationId = request?.headers?.['x-correlation-id'] || uuidv4();
    if (request && request.headers) {
      request.headers['x-correlation-id'] = correlationId;
    }

    // ✅ Récupération des infos client
    const userAgentString = request?.headers?.['user-agent'] || '';
    const ua = new UAParser(userAgentString).getResult();

    const clientInfo = {
      browser: {
        name: ua.browser.name || 'Unknown',
        version: ua.browser.version || 'Unknown',
        major: ua.browser.major || 'Unknown',
      },
      os: {
        name: ua.os.name || 'Unknown',
        version: ua.os.version || 'Unknown',
      },
      device: {
        type: ua.device.type || 'desktop', // mobile, tablet, console, smarttv...
        vendor: ua.device.vendor || 'Unknown',
        model: ua.device.model || 'Unknown',
      },
      engine: {
        name: ua.engine.name || 'Unknown',
        version: ua.engine.version || 'Unknown',
      },
      cpu: {
        architecture: ua.cpu.architecture || 'Unknown',
      },
      // Infos réseau / contexte
      ip:
        request?.headers?.['x-forwarded-for']?.split(',')[0]?.trim() ||
        request?.ip ||
        request?.socket?.remoteAddress ||
        'Unknown',
      referer: request?.headers?.['referer'] || 'Unknown',
      origin: request?.headers?.['origin'] || 'Unknown',
      acceptLanguage: request?.headers?.['accept-language'] || 'Unknown',
      userAgent: userAgentString,
    };

    const now = Date.now();
    const meta = { correlationId };

    // ✅ Log d'entrée explicite
    console.log({
      event: 'REQUEST_INCOMING',
      date: new Date().toISOString(),
      correlationId,
      route: {
        className,
        methodName,
        url: request.url,
        originalUrl: request.originalUrl,
        method: request.method,
      },
      params: request.params,
      query: request.query,
      body: request.body,
      client: clientInfo,
    });

    return next.handle().pipe(
      tap(() => {
        const executionTime = Date.now() - now;
        console.log({
          event: 'REQUEST_PROCESSED',
          correlationId,
          className,
          methodName,
          executionTimeMs: executionTime,
          statusCode: request.res?.statusCode,
        });
      }),
      catchError((err) => {
        const executionTime = Date.now() - now;
        console.log({
          event: 'REQUEST_FAILED',
          correlationId,
          message: `Request Failed: ${err.message}`,
          className,
          methodName,
          executionTimeMs: executionTime,
          statusCode: err.status || 500,
          client: {
            browser: clientInfo.browser.name,
            os: clientInfo.os.name,
            ip: clientInfo.ip,
          },
        });
        return throwError(() => err);
      }),
    );
  }
}