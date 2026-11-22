import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from '../../common/crud/crud.service';
import { CessionLegale } from '../entities/cession-legale.entity';

@Injectable()
export class CessionLegaleService extends CrudService<CessionLegale> {
  constructor(@InjectRepository(CessionLegale) repository: Repository<CessionLegale>) {
    super(repository);
  }
}
