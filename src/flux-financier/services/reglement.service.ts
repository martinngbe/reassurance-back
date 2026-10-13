import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { 
  CrudService, 
} from '../../common/crud/crud.service';
import { Reglement } from '../entities/reglement.entity';

@Injectable()
export class ReglementService extends CrudService<Reglement> {
  constructor(@InjectRepository(Reglement) repository: Repository<Reglement>) {
    super(repository);
  }
 
}