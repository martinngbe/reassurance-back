import {  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from 'src/common/crud/crud.service';
import { TempObjetAssure } from '../entities/temp-objet-assure.entity';

@Injectable()
export class TempObjetAssureService  extends CrudService<TempObjetAssure>{
  constructor(
    @InjectRepository(TempObjetAssure)
    private tempObjetAssureRepository: Repository<TempObjetAssure>,
  
  ) {super(tempObjetAssureRepository);}
}