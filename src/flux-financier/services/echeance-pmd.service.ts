import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { 
  CrudService, 
} from '../../common/crud/crud.service';
import { EcheancePmd } from '../entities/echeance-pmd.entity';

@Injectable()
export class EcheancePmdService extends CrudService<EcheancePmd> {
  constructor(@InjectRepository(EcheancePmd) repository: Repository<EcheancePmd>) {
    super(repository);
  }
 
}