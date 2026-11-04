import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from '../../common/crud/crud.service';
import { NaturePlacement } from '../entities/nature-placement.entity';

@Injectable()
export class NaturePlacementService extends CrudService<NaturePlacement> {
  constructor(@InjectRepository(NaturePlacement) repository: Repository<NaturePlacement>) {
    super(repository);
  }
}
