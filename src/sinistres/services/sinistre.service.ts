import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from '../../common/crud/crud.service';
import { Sinistre } from '../entities/sinistre.entity';

@Injectable()
export class SinistreService extends CrudService<Sinistre> {
  constructor(@InjectRepository(Sinistre) repository: Repository<Sinistre>) {
    super(repository);
  }
}
