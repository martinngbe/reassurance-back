import {
  Controller, Get,  Param,  ParseIntPipe,  Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CrudController } from 'src/common/crud/crud.controller';
import { FindManyOptions } from 'typeorm';
import { CreateObjetAssureDto } from '../dto/create-objet-assure.dto';
import { UpdateObjetAssureDto } from '../dto/update-objet-assure.dto';
import { TempObjetAssure } from '../entities/temp-objet-assure.entity';
import { TempObjetAssureService } from '../services/temp-objet-assure.service';

@ApiTags('Métier Affaires - TempObjetAssures')
@Controller('temp-objet-assure')
export class TempObjetAssureController extends CrudController<TempObjetAssure, CreateObjetAssureDto, UpdateObjetAssureDto> {
  constructor(private readonly tempObjetAssureService: TempObjetAssureService) 
  {  super(tempObjetAssureService);}

   // les quittances seront affichées par ordre de la plus récentes
   protected buildOptions(query: any): FindManyOptions<TempObjetAssure> {
      const options: FindManyOptions<TempObjetAssure> = {
        where: {},
        order: { createdAt: 'DESC' }, // Tri par défaut
      };
      return options;
    }
  
}