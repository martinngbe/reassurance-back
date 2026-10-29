import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { 
  CrudService, 
} from '../../common/crud/crud.service';
import { CompteRubrique } from '../entities/compte-rubrique.entity';

@Injectable()
export class CompteRubriqueService extends CrudService<CompteRubrique> {
  constructor(@InjectRepository(CompteRubrique) repository: Repository<CompteRubrique>) {
    super(repository);
  }
 
}