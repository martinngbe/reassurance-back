import { Injectable } from '@nestjs/common';
import {
  DataSource,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class AuditSubscriber implements EntitySubscriberInterface {
  constructor(
    private readonly cls: ClsService,
    dataSource: DataSource,
  ) {
    dataSource.subscribers.push(this);
  }

  // S'applique à toutes les entités (ou remplacez Object par votre classe BaseEntity)
  listenTo() {
    return Object;
  }

  beforeInsert(event: InsertEvent<any>) {
    console.log("_____________________________________________")
    console.log("     AuditSubscriber.beforeInsert")
    console.log("_____________________________________________")
    //const userId = this.cls.get<string>('userId');
    const userId = this.cls.isActive() ? this.cls.get('userId') : null;
    console.log("   userId:",userId)
    console.log("   Avant event.entity:",event.entity)
    if (userId && event.entity) {

      if ('createdBy' in event.entity) {
        event.entity.createdBy = userId;
      }
      if ('updatedBy' in event.entity) {
        event.entity.updatedBy = userId;
      }
     
    }
    console.log("  Apres event.entity:",event.entity)
    console.log("_____________________________________________")
  }

  beforeUpdate(event: UpdateEvent<any>) {
    console.log("_____________________________________________")
    console.log("     AuditSubscriber.beforeUpdate")
    console.log("_____________________________________________")    
    //const userId = this.cls.get<string>('userId');
    const userId = this.cls.isActive() ? this.cls.get('userId') : null;
    console.log("   userId:",userId)
    console.log("   Avant event.entity:",event.entity)
    if (userId && event.entity) {
      if ('updatedBy' in event.entity) {
        event.entity.updatedBy = userId;
      }
    }
    console.log("  Apres event.entity:",event.entity)
    console.log("_____________________________________________")
  }
}