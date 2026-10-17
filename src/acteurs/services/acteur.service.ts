import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from '../../common/crud/crud.service';
import { Acteur } from '../entities/acteur.entity';

@Injectable()
export class ActeurService extends CrudService<Acteur> {
  constructor(@InjectRepository(Acteur) repository: Repository<Acteur>) {
    super(repository);
  }
}
