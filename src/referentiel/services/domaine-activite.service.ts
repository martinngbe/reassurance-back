import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from '../../common/crud/crud.service';
import { DomaineActivite } from '../entities/domaine-activite.entity';

@Injectable()
export class DomaineActiviteService extends CrudService<DomaineActivite> {
  constructor(@InjectRepository(DomaineActivite) repository: Repository<DomaineActivite>) {
    super(repository);
  }
}
