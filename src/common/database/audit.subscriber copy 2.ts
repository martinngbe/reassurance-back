import { Injectable } from '@nestjs/common';
import {
  DataSource,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
  EventSubscriber,
} from 'typeorm';
import { ClsService } from 'nestjs-cls';

@EventSubscriber() // ✅ Indispensable
@Injectable()
export class AuditSubscriber implements EntitySubscriberInterface {
  constructor(
    private readonly cls: ClsService,
    dataSource: DataSource,
  ) {
    dataSource.subscribers.push(this);
  }

  // ✅ Supprimé listenTo() — s'applique à TOUTES les entités

  beforeInsert(event: InsertEvent<any>) {
    const userId = this.getUserId();
    if (!userId || !event.entity) return;

    if ('createdBy' in event.entity) event.entity.createdBy = userId;
    if ('updatedBy' in event.entity) event.entity.updatedBy = userId;
  }

  beforeUpdate(event: UpdateEvent<any>) {
    const userId = this.getUserId();
    if (!userId || !event.entity) return;

    if ('updatedBy' in event.entity) event.entity.updatedBy = userId;
  }

  private getUserId(): number | null {
    if (!this.cls.isActive()) return null;
    return this.cls.get('userId') ?? null;
  }
}