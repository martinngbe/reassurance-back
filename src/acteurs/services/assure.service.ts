import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from '../../common/crud/crud.service';
import { Assure } from '../entities/assure.entity';

@Injectable()
export class AssureService extends CrudService<Assure> {
  constructor(@InjectRepository(Assure) repository: Repository<Assure>) {
    super(repository);
  }
}
