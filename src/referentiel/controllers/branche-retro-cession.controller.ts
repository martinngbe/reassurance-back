import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from '../../common/crud/crud.controller';
import { FindManyOptions } from 'typeorm';
import { BrancheRetroCession } from '../entities/branche-retro-cession.entity';
import { BrancheRetroCessionService } from '../services/branche-retro-cession.service';
import { CreateBrancheRetroCessionDto } from '../dto/create-branche-retro-cession.dto';
import { UpdateBrancheRetroCessionDto } from '../dto/update-branche-retro-cession.dto';

@ApiTags('BrancheCession')
@Controller('branche-retro-cession')
export class BrancheRetroCessionController extends
 CrudController<BrancheRetroCession, CreateBrancheRetroCessionDto, UpdateBrancheRetroCessionDto> {
  constructor(service: BrancheRetroCessionService) {
    super(service);
  }
   // les diffentes options ou filtre pour 
    protected buildOptions(query: any): FindManyOptions<BrancheRetroCession> {
      const baseSort: any = {code: 'ASC'};// Tri par défaut
      const options: FindManyOptions<BrancheRetroCession> = {
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
