import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { 
  CrudService, 
} from '../../common/crud/crud.service';
import { BrancheRetroCession } from '../entities/branche-retro-cession.entity';

@Injectable()
export class BrancheRetroCessionService extends CrudService<BrancheRetroCession> {
  constructor(@InjectRepository(BrancheRetroCession) repository: Repository<BrancheRetroCession>) {
    super(repository);
  }
 
}