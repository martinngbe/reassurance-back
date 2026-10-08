import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { 
  CrudService, 
} from '../../common/crud/crud.service';
import { Branche } from '../entities/branche.entity';

@Injectable()
export class BrancheService extends CrudService<Branche> {
  constructor(@InjectRepository(Branche) repository: Repository<Branche>) {
    super(repository);
  }
 
}