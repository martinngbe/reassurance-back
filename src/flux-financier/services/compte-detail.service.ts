import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { 
  CrudService, 
} from '../../common/crud/crud.service';
import { CompteDetail } from '../entities/compte-detail.entity';

@Injectable()
export class CompteDetailService extends CrudService<CompteDetail> {
  constructor(@InjectRepository(CompteDetail) repository: Repository<CompteDetail>) {
    super(repository);
  }
 
}