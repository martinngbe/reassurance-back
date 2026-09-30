// src/common/filters/all-exceptions.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { IResponse } from '../interfaces/response.interface';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Erreur interne du serveur';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      
      // Gérer le format de réponse de NestJS (peut être une string ou un objet)
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        message = (exceptionResponse as any).message || message;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    // Construction de la réponse d'erreur normalisée
    const errorResponse: IResponse = {
      success: false,
      data: null,
      message: message,
    };

    // On renvoie toujours un statut HTTP approprié, mais avec le format JSON unifié
    response.status(status).json(errorResponse);
  }
}