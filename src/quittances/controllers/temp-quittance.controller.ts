import {
  Controller, Get,  Param,  ParseIntPipe,  Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { CrudController } from 'src/common/crud/crud.controller';
import { FindManyOptions } from 'typeorm';
import { TempQuittanceService } from '../services/temp-quittance.service';
import { CreateTempQuittanceDto } from '../dto/create-temp-quittance.dto';
import { UpdateTempQuittanceDto } from '../dto/update-temp-quittance.dto';
import { TempQuittance } from '../entities/temp-quittance.entity';

@ApiTags('Métier Affaires - TempTempQuittances')
@Controller('temp-quittance')
export class TempQuittanceController extends CrudController<TempQuittance, CreateTempQuittanceDto, UpdateTempQuittanceDto> {
  constructor(private readonly quittanceService: TempQuittanceService) 
  {  super(quittanceService);}

   // les quittances seront affichées par ordre de la plus récentes
   protected buildOptions(query: any): FindManyOptions<TempQuittance> {
      const options: FindManyOptions<TempQuittance> = {
        where: {},
        order: { createdAt: 'DESC' }, // Tri par défaut
      };
      return options;
    }
  

}