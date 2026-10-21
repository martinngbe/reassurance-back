import {  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from 'src/common/crud/crud.service';
import { ObjetAssure } from '../entities/objet-assure.entity';

@Injectable()
export class ObjetAssureService  extends CrudService<ObjetAssure>{
  constructor(
    @InjectRepository(ObjetAssure)
    private objetAssureRepository: Repository<ObjetAssure>,
  
  ) {super(objetAssureRepository);}
}