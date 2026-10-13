import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { 
  CrudService, 
} from '../../common/crud/crud.service';
import { SinistreReglementDetail } from '../entities/sinistre-reglement-detail.entity';

@Injectable()
export class SinistreReglementDetailService extends CrudService<SinistreReglementDetail> {
  constructor(@InjectRepository(SinistreReglementDetail) repository: Repository<SinistreReglementDetail>) {
    super(repository);
  }
 
}