import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from '../../common/crud/crud.service';
import { NatureCession } from '../entities/nature-cession.entity';

@Injectable()
export class NatureCessionService extends CrudService<NatureCession> {
  constructor(@InjectRepository(NatureCession) repository: Repository<NatureCession>) {
    super(repository);
  }
}
