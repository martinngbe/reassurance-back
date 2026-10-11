import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from '../../common/crud/crud.service';
import { SinistreTypeEvaluation } from '../entities/sinistre-type-evaluation.entity';

@Injectable()
export class SinistreTypeEvaluationService extends CrudService<SinistreTypeEvaluation> {
  constructor(@InjectRepository(SinistreTypeEvaluation) repository: Repository<SinistreTypeEvaluation>) {
    super(repository);
  }
}
