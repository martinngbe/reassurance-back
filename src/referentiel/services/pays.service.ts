import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from '../../common/crud/crud.service';
import { Pays } from '../entities/pays.entity';

@Injectable()
export class PaysService extends CrudService<Pays> {
  constructor(@InjectRepository(Pays) repository: Repository<Pays>) {
    super(repository);
  }
}
