import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { 
  CrudService, 
} from '../../common/crud/crud.service';
import { SinistreEvaluation } from '../entities/sinistre-evaluation.entity';

@Injectable()
export class SinistreEvaluationService extends CrudService<SinistreEvaluation> {
  constructor(@InjectRepository(SinistreEvaluation) repository: Repository<SinistreEvaluation>) {
    super(repository);
  }
 
}