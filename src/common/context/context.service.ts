// src/common/context/context.service.ts
import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

export interface RequestContext {
  userId?: string; // ou number, selon votre type d'ID
}

@Injectable()
export class ContextService {
  private readonly als = new AsyncLocalStorage<RequestContext>();

  getStore() {
    return this.als.getStore();
  }

  run(context: RequestContext, callback: () => void) {
    return this.als.run(context, callback);
  }
}