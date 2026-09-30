import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from '../../common/crud/crud.service';
import { Contact } from '../entities/contact.entity';

@Injectable()
export class ContactService extends CrudService<Contact> {
  constructor(@InjectRepository(Contact) repository: Repository<Contact>) {
    super(repository);
  }
}
