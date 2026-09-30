import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from '../../common/crud/crud.service';
import { CompteType } from '../entities/compte-type.entity';

@Injectable()
export class CompteTypeService extends CrudService<CompteType> {
  constructor(@InjectRepository(CompteType) repository: Repository<CompteType>) {
    super(repository);
  }
}
