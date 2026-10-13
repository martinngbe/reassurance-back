import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { 
  CrudService, 
} from '../../common/crud/crud.service';
import { Bordereau } from '../entities/bordereau.entity';

@Injectable()
export class BordereauService extends CrudService<Bordereau> {
  constructor(@InjectRepository(Bordereau) repository: Repository<Bordereau>) {
    super(repository);
  }
 
}