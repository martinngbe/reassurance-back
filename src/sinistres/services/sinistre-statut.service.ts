import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from '../../common/crud/crud.service';
import { SinistreStatut } from '../entities/sinistre-statut.entity';

@Injectable()
export class SinistreStatutService extends CrudService<SinistreStatut> {
  constructor(@InjectRepository(SinistreStatut) repository: Repository<SinistreStatut>) {
    super(repository);
  }
}
