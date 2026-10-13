import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { 
  CrudService, 
} from '../../common/crud/crud.service';
import { QuittanceCession } from '../entities/quittance-cession.entity';

@Injectable()
export class QuittanceCessionService extends CrudService<QuittanceCession> {
  constructor(@InjectRepository(QuittanceCession) repository: Repository<QuittanceCession>) {
    super(repository);
  }
 
}