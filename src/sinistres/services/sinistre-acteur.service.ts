import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from '../../common/crud/crud.service';
import { SinistreActeur } from '../entities/sinistre-acteur.entity';

@Injectable()
export class SinistreActeurService extends CrudService<SinistreActeur> {
  constructor(@InjectRepository(SinistreActeur) repository: Repository<SinistreActeur>) {
    super(repository);
  }
}
