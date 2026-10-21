import {
  Controller, Get,  Param,  ParseIntPipe,  Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { CrudController } from 'src/common/crud/crud.controller';
import { FindManyOptions } from 'typeorm';
import { CreateObjetAssureDto } from '../dto/create-objet-assure.dto';
import { UpdateObjetAssureDto } from '../dto/update-objet-assure.dto';
import { ObjetAssure } from '../entities/objet-assure.entity';
import { ObjetAssureService } from '../services/objet-assure.service';

@ApiTags('Métier Affaires - ObjetAssures')
@Controller('objet-assure')
export class ObjetAssureController extends CrudController<ObjetAssure, CreateObjetAssureDto, UpdateObjetAssureDto> {
  constructor(private readonly quittanceService: ObjetAssureService) 
  {  super(quittanceService);}

   // les quittances seront affichées par ordre de la plus récentes
   protected buildOptions(query: any): FindManyOptions<ObjetAssure> {
      const options: FindManyOptions<ObjetAssure> = {
        where: {},
        order: { createdAt: 'DESC' }, // Tri par défaut
      };
      return options;
    }
  
}