import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from '../../common/crud/crud.controller';
import { Mouvement } from '../entities/mouvement.entity';
import { MouvementService } from '../services/mouvement.service';
import { CreateMouvementDto } from '../dto/create-mouvement.dto';
import { UpdateMouvementDto } from '../dto/update-mouvement.dto';
import { FindManyOptions } from 'typeorm';
import { success } from 'src/common/helper/response.helper';

@ApiTags('Mouvement')
@Controller('mouvement')
export class MouvementController extends CrudController<Mouvement, CreateMouvementDto, UpdateMouvementDto> {
   // 👇 AJOUT DE "protected readonly" pour surcharger le typage de la classe parente
  constructor(protected readonly service: MouvementService) {
    super(service);
  }

     protected buildOptions(query: any): FindManyOptions<Mouvement> {
          const baseSort: any = {libelle: 'ASC'};// Tri par défaut
          const options: FindManyOptions<Mouvement> = {
            where: {},
            order: {}, 
          };
          
          if( query.sortKey && query.sortDirection){
              
              options.order ={ [query.sortKey]: `${query.sortDirection}`}
          }else {
            options.order = baseSort
          }
        
          return options;
     }
 /**
   * GET /mouvement/code/:code
   * Récupération d'un mouvement par son code
   */
  @Get('code/:code')
  async findOneByCode(@Param('code') code: string) {
    const mouvement = await this.service.findByCode(code);
    return success(mouvement);
  }
   
}
