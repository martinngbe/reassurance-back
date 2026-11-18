import {
  Controller, Get,  Param,  ParseIntPipe,  Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { CrudController } from 'src/common/crud/crud.controller';
import { FindManyOptions, Like } from 'typeorm';
import { QuittanceTranche } from '../entities/quittance-tranche.entity';
import { CreateQuittanceTrancheDto } from '../dto/create-quittance-tranche.dto';
import { QuittanceTrancheService } from '../services/quittance-tranche.service';
import { UpdateQuittanceTrancheDto } from '../dto/update-quittance-tranche.dto';
import { OPERATION_SUCCES, success } from 'src/common/helper/response.helper';

@ApiTags('Métier Affaires - QuittanceTranches')
@Controller('quittance-tranche')
export class QuittanceTrancheController extends CrudController<QuittanceTranche, 
CreateQuittanceTrancheDto, UpdateQuittanceTrancheDto> {
  constructor(private readonly quittanceTrancheService: QuittanceTrancheService) 
  {  super(quittanceTrancheService);}

 
   // les quittanceCessions seront affichées par ordre de la plus récentes
   protected buildOptions(query: any): FindManyOptions<QuittanceTranche> {
          const baseSort: any = {createdAt: 'ASC'};// Tri par défaut
             const options: FindManyOptions<QuittanceTranche> = {
               where: {},
               order: {}, 
             };
  
      if( query.sortKey && query.sortDirection){          
          options.order ={ [query.sortKey]: `${query.sortDirection}`}
      }else {
        options.order = baseSort
      }
  
      // 3. Filtres exacts (AND)
      const baseWhere: any = {};
      // filtre sur un champs spécifique; Tableau de conditions
       if (query.quittanceId) {
        baseWhere.quittance = { id: parseInt(query.quittanceId, 10) };
      }
      options.where = baseWhere;
      console.log("options:", options);
      
          
      return options;
    }
  


}