import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from '../../common/crud/crud.service';
import { NatureOffre } from '../entities/nature-offre.entity';

@Injectable()
export class NatureOffreService extends CrudService<NatureOffre> {
  constructor(@InjectRepository(NatureOffre) repository: Repository<NatureOffre>) {
    super(repository);
  }
}
