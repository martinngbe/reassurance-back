import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from '../../common/crud/crud.service';
import { SousBranche } from '../entities/sous-branche.entity';

@Injectable()
export class SousBrancheService extends CrudService<SousBranche> {
  constructor(@InjectRepository(SousBranche) repository: Repository<SousBranche>) {
    super(repository);
  }
}
