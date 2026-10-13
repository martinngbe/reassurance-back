import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { 
  CrudService, 
} from '../../common/crud/crud.service';
import { SinistreReglement } from '../entities/sinistre-reglement.entity';

@Injectable()
export class SinistreReglementService extends CrudService<SinistreReglement> {
  constructor(@InjectRepository(SinistreReglement) repository: Repository<SinistreReglement>) {
    super(repository);
  }
 
}