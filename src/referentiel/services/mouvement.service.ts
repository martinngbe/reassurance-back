import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from '../../common/crud/crud.service';
import { Mouvement } from '../entities/mouvement.entity';

@Injectable()
export class MouvementService extends CrudService<Mouvement> {
  constructor(@InjectRepository(Mouvement) repository: Repository<Mouvement>) {
    super(repository);
  }
}
