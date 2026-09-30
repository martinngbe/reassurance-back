import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from '../../common/crud/crud.service';
import { Region } from '../entities/region.entity';

@Injectable()
export class RegionService extends CrudService<Region> {
  constructor(@InjectRepository(Region) repository: Repository<Region>) {
    super(repository);
  }
}
