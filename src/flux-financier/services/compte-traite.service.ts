import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { 
  CrudService, 
} from '../../common/crud/crud.service';
import { CompteTraite } from '../entities/compte-traite.entity';

@Injectable()
export class CompteTraiteService extends CrudService<CompteTraite> {
  constructor(@InjectRepository(CompteTraite) repository: Repository<CompteTraite>) {
    super(repository);
  }
 
}