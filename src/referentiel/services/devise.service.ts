import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from '../../common/crud/crud.service';
import { Devise } from '../entities/devise.entity';

@Injectable()
export class DeviseService extends CrudService<Devise> {
  constructor(@InjectRepository(Devise) repository: Repository<Devise>) {
    super(repository);
  }
}
