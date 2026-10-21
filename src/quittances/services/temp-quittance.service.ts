import {  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from 'src/common/crud/crud.service';
import { TempQuittance } from '../entities/temp-quittance.entity';

@Injectable()
export class TempQuittanceService  extends CrudService<TempQuittance>{
  constructor(
    @InjectRepository(TempQuittance)
    private tempQuittanceRepository: Repository<TempQuittance>,
   
  ) {super(tempQuittanceRepository);}
}