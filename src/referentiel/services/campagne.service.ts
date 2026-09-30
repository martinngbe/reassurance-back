import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from '../../common/crud/crud.service';
import { Campagne } from '../entities/campagne.entity';

@Injectable()
export class CampagneService extends CrudService<Campagne> {
  constructor(@InjectRepository(Campagne) repository: Repository<Campagne>) {
    super(repository);
  }
}
