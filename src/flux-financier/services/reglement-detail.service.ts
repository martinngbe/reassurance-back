import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { 
  CrudService, 
} from '../../common/crud/crud.service';
import { ReglementDetail } from '../entities/reglement-detail.entity';

@Injectable()
export class ReglementDetailService extends CrudService<ReglementDetail> {
  constructor(@InjectRepository(ReglementDetail) repository: Repository<ReglementDetail>) {
    super(repository);
  }
 
}