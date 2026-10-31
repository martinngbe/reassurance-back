import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { 
  CrudService, 
} from '../../common/crud/crud.service';
import { QuittancePlacement } from '../entities/quittance-placement.entity';

@Injectable()
export class QuittanceCessionService extends CrudService<QuittancePlacement> {
  constructor(@InjectRepository(QuittancePlacement) repository: Repository<QuittancePlacement>) {
    super(repository);
  }
 
}