import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { 
  CrudService, 
} from '../../common/crud/crud.service';
import { Compte } from '../entities/compte.entity';

@Injectable()
export class CompteService extends CrudService<Compte> {
  constructor(@InjectRepository(Compte) repository: Repository<Compte>) {
    super(repository);
  }
 
}