// import {
//   Injectable,
//   NestInterceptor,
//   ExecutionContext,
//   CallHandler,
// } from '@nestjs/common';
// import { Observable, throwError } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';
// import { AppLogger } from '../logger/app-logger.service';
// import { v4 as uuidv4 } from 'uuid';

// @Injectable()
// export class LoggingInterceptor implements NestInterceptor {
//   // On retire l'injection @Inject(REQUEST) du constructeur
//   constructor(private readonly logger: AppLogger) {}

//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     const className = context.getClass().name;
//     const methodName = context.getHandler().name;
//     //console.log("LoggingInterceptor className:",className);
//     //console.log("LoggingInterceptor methodName:",methodName);
//     // ✅ Récupération de la requête HTTP via le contexte d'exécution
//     const request = context.switchToHttp().getRequest();
    
//     //console.log("LoggingInterceptor request:",request)
//     // ✅ Génération ou récupération d'un Correlation ID
//     // L'optional chaining (?.) évite les crashs si request ou headers est undefined
//     const correlationId = request?.headers?.['x-correlation-id'] || uuidv4();
    
//     if (request && request.headers) {
//       request.headers['x-correlation-id'] = correlationId;
//     }

//     const now = Date.now();
//     const meta = { correlationId };

//     console.log({
//       date : new Date(),
//       className:className,
//       methodName:methodName,
//       url:request.url,
//       originalUr:request.originalUrl,
//       method:request.method,
//       params:request.params,
//       query:request.query,
//       body:request.body,
//       //route:request.route,
//     })

//     //this.logger.log(`Request Incoming`, className, methodName, meta);

//     return next.handle().pipe(
//       tap(() => {
//         const executionTime = Date.now() - now;
//           console.log({
//             requete : "Request Processed",
//             className:className,
//             methodName:methodName,
//            executionTimeMs:executionTime
//           })

//         // this.logger.log(
//         //   `Request Processed`,
//         //   className,
//         //   methodName,
//         //   { ...meta, executionTimeMs: executionTime }
//         // );

//       }),
//       catchError((err) => {
//         const executionTime = Date.now() - now;
//         console.log({
//             requete : "Request Failed",
//             message : `Request Failed: ${err.message}`,
//             className:className,
//             methodName:methodName,
//             executionTimeMs:executionTime,
//             statusCode: err.status || 500
//           })
//         // this.logger.error(
//         //   `Request Failed: ${err.message}`,
//         //   err.stack,
//         //   className,
//         //   methodName,
//         //   { ...meta, executionTimeMs: executionTime, statusCode: err.status || 500 }
//         // );
//         return throwError(() => err);
//       }),
//     );
//   }
// }