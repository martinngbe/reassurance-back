import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { 
  CrudService, 
} from '../../common/crud/crud.service';
import { Role } from '../entities/role.entity';

@Injectable()
export class RoleService extends CrudService<Role> {
  constructor(@InjectRepository(Role) repository: Repository<Role>) {
    super(repository);
  }
 
}