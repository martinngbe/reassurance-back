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
        order: {}, // Tri par défaut
      };
      const baseSort: any = { createdAt: 'DESC'  };// Tri par défaut
      if( query.sortKey && query.sortDirection){
          options.order ={ [query.sortKey]: `${query.sortDirection}`}
      }else {
        options.order = baseSort
      }   

      // filtre sur un champs spécifique; Tableau de conditions
      const baseWhere: any = {};
      if (query.policeId) {
        baseWhere.police = { id: parseInt(query.policeId, 10) }; 
      }
    
      
      options.where = baseWhere

      console.log("options:",options)
      console.log("_____________________________________")

      return options;
    }
  

  @Patch(':id/annuler')
  @ApiOperation({ summary: 'Annule une quittance' })
  annuler(@Param('id', ParseIntPipe) id: number): Promise<Quittance> {
    //return this.quittanceService.annuler(id);
    return this.quittanceService.findOne(0)
  }
}