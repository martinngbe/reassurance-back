import { Injectable } from '@nestjs/common';
import {
  DataSource,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
  EventSubscriber,
} from 'typeorm';
import { ClsService } from 'nestjs-cls';

@EventSubscriber() // Indispensable pour que TypeORM le reconnaisse
@Injectable()
export class AuditSubscriber implements EntitySubscriberInterface {
  constructor(
    private readonly cls: ClsService,
    dataSource: DataSource,
  ) {
    dataSource.subscribers.push(this);
  }

  // J'ai supprimé listenTo() pour qu'il s'applique à TOUTES les entités.

  beforeInsert(event: InsertEvent<any>) {
    const userId = this.cls.isActive() ? this.cls.get('userId') : null;
    
    if (userId && event.entity) {
      if ('createdBy' in event.entity) event.entity.createdBy = userId;
      if ('updatedBy' in event.entity) event.entity.updatedBy = userId;
    }
  }

  beforeUpdate(event: UpdateEvent<any>) {
    const userId = this.cls.isActive() ? this.cls.get('userId') : null;
    
    if (userId && event.entity) {
      if ('updatedBy' in event.entity) event.entity.updatedBy = userId;
    }
  }
}