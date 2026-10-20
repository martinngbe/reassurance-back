import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from '../../common/crud/crud.controller';

import { Campagne } from '../entities/campagne.entity';
import { CampagneService } from '../services/campagne.service';
import { CreateCampagneDto } from '../dto/create-campagne.dto';
import { UpdateCampagneDto } from '../dto/update-campagne.dto';
import { FindManyOptions } from 'typeorm';

@ApiTags('Campagne')
@Controller('campagne')
export class CampagneController extends CrudController<Campagne, CreateCampagneDto, UpdateCampagneDto> {
  constructor(service: CampagneService) {
    super(service);
  }

     protected buildOptions(query: any): FindManyOptions<Campagne> {
        const baseSort: any = {code: 'ASC'};// Tri par défaut
        const options: FindManyOptions<Campagne> = {
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
}
