import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { 
  CrudService, 
} from '../../common/crud/crud.service';
import { SinistreQuittance } from '../entities/sinistre-quittance.entity';

@Injectable()
export class SinistreQuittanceService extends CrudService<SinistreQuittance> {
  constructor(@InjectRepository(SinistreQuittance) repository: Repository<SinistreQuittance>) {
    super(repository);
  }
 
}