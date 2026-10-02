import { Injectable, LoggerService, Scope } from '@nestjs/common';
import * as winston from 'winston';
import { winstonConfig } from '../../config/winston.config';

//@Injectable({ scope: Scope.TRANSIENT }) // Transient pour avoir une instance par classe injectée
@Injectable() 
export class AppLogger implements LoggerService {
  private context?: string;
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger(winstonConfig);
  }

  // Permet à NestJS de définir le contexte (nom de la classe) automatiquement
  setContext(context: string) {
    this.context = context;
  }

  log(message: any, context?: string, method?: string, meta?: Record<string, any>) {
    this.logger.info(message, { context: context || this.context, method, ...meta });
  }

  error(message: any, trace?: string, context?: string, method?: string, meta?: Record<string, any>) {
    this.logger.error(message, { context: context || this.context, method, trace, ...meta });
  }

  warn(message: any, context?: string, method?: string, meta?: Record<string, any>) {
    this.logger.warn(message, { context: context || this.context, method, ...meta });
  }

  debug(message: any, context?: string, method?: string, meta?: Record<string, any>) {
    this.logger.debug(message, { context: context || this.context, method, ...meta });
  }

  verbose(message: any, context?: string, method?: string, meta?: Record<string, any>) {
    this.logger.verbose(message, { context: context || this.context, method, ...meta });
  }
}