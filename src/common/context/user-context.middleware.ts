// src/common/context/user-context.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ContextService } from './context.service';

@Injectable()
export class UserContextMiddleware implements NestMiddleware {
  constructor(private readonly contextService: ContextService) {}

  use(req: Request & { user?: { id: string } }, res: Response, next: NextFunction) {
    const userId = req.user?.id; // Adapté selon la structure de votre payload JWT
    
    // ⚠️ Important : next() doit être appelé À L'INTÉRIEUR de .run() 
    // pour que le contexte soit propagé à toute la chaîne d'exécution async.
    this.contextService.run({ userId }, () => {
      next();
    });
  }
}