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
    if (userId == null || !event.entity) return;

    if (event.metadata.findColumnWithPropertyName('createdBy')) {
      event.entity.createdBy = userId;
    }
    if (event.metadata.findColumnWithPropertyName('updatedBy')) {
      event.entity.updatedBy = userId;
    }
  }

  beforeUpdate(event: UpdateEvent<any>) {
    const userId = this.getUserId();
    if (userId == null || !event.entity) return;

    if (event.metadata.findColumnWithPropertyName('updatedBy')) {
      event.entity.updatedBy = userId;
    }
  }

  private getUserId(): number | null {
    if (!this.cls.isActive()) return null;
    const id = this.cls.get('userId');
    return id != null ? Number(id) : null;
  }
}