import {
  Controller, Get,  Param,  ParseIntPipe,  Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { CrudController } from 'src/common/crud/crud.controller';
import { FindManyOptions, Like } from 'typeorm';
import { QuittancePlacement } from '../entities/quittance-placement.entity';
import { CreateQuittancePlacementDto } from '../dto/create-quittance-placement.dto';
import { QuittancePlacementService } from '../services/quittance-placement.service';
import { UpdateQuittancePlacementDto } from '../dto/update-quittance-placement.dto';
import { OPERATION_SUCCES, success } from 'src/common/helper/response.helper';

@ApiTags('Métier Affaires - QuittanceCessions')
@Controller('quittance-placement')
export class QuittancePlacementController extends CrudController<QuittancePlacement, 
CreateQuittancePlacementDto, UpdateQuittancePlacementDto> {
  constructor(private readonly quittancePlacementService: QuittancePlacementService) 
  {  super(quittancePlacementService);}

 
   // les quittanceCessions seront affichées par ordre de la plus récentes
   protected buildOptions(query: any): FindManyOptions<QuittancePlacement> {
          const baseSort: any = {createdAt: 'ASC'};// Tri par défaut
             const options: FindManyOptions<QuittancePlacement> = {
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
  

  @Patch(':id/annuler')
  @ApiOperation({ summary: 'Annule une quittanceCession' })
  annuler(@Param('id', ParseIntPipe) id: number): Promise<QuittancePlacement> {
    //return this.quittanceCessionService.annuler(id);
    return this.quittancePlacementService.findOne(0)
  }


  @Get('cumul-taux/:quittanceId')
  @ApiOperation({ 
    summary: 'Récupère le cumul des taux de cession d\'une quittance',
    description: 'Retourne le taux accepté, le cumul actuel et le disponible'
  })
  async getCumulTauxCession(
    @Param('quittanceId', ParseIntPipe) quittanceId: number,
  ) {
    return this.quittancePlacementService.getCumulTauxCession(quittanceId);
  }
}