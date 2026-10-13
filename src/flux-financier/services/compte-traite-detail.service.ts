import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { 
  CrudService, 
} from '../../common/crud/crud.service';
import { CompteTraiteDetail } from '../entities/compte-traite-detail.entity';

@Injectable()
export class CompteTraiteDetailService extends CrudService<CompteTraiteDetail> {
  constructor(@InjectRepository(CompteTraiteDetail) repository: Repository<CompteTraiteDetail>) {
    super(repository);
  }
 
}