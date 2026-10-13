import {
  Controller, Get,  Param,  ParseIntPipe,  Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { QuittanceService } from '../services/quittance.service';
import { Quittance } from '../entities/quittance.entity';

import { CrudController } from 'src/common/crud/crud.controller';
import { CreateQuittanceDto } from '../dto/create-quittance.dto';
import { UpdateQuittanceDto } from '../dto/update-quittance.dto';
import { FindManyOptions } from 'typeorm';

@ApiTags('Métier Affaires - Quittances')
@Controller('quittance')
export class QuittanceController extends CrudController<Quittance, CreateQuittanceDto, UpdateQuittanceDto> {
  constructor(private readonly quittanceService: QuittanceService) 
  {  super(quittanceService);}

   // les quittances seront affichées par ordre de la plus récentes
   protected buildOptions(query: any): FindManyOptions<Quittance> {
      const options: FindManyOptions<Quittance> = {
        where: {},
        order: { createdAt: 'DESC' }, // Tri par défaut
      };
      return options;
    }
  

  @Patch(':id/annuler')
  @ApiOperation({ summary: 'Annule une quittance' })
  annuler(@Param('id', ParseIntPipe) id: number): Promise<Quittance> {
    //return this.quittanceService.annuler(id);
    return this.quittanceService.findOne(0)
  }
}