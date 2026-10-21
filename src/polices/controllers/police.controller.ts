import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from 'src/common/crud/crud.controller';
import { CreatePoliceDto } from '../dto/create-police.dto';
import { UpdatePoliceDto } from '../dto/update-police.dto';
import { Police } from '../entities/police.entity';
import { FindManyOptions } from 'typeorm';
import { PoliceService } from '../services/police.service';

@ApiTags('Police')
@Controller('police')
export class PoliceController extends CrudController<Police, CreatePoliceDto, UpdatePoliceDto> {
  constructor(service: PoliceService) {
    super(service);
  }
     // les diffentes options ou filtre pour 
      protected buildOptions(query: any): FindManyOptions<Police> {        
            console.log("_____________________________________")
            console.log("PoliceController.buildOptions")
            console.log("query:",query)
            console.log("_____________________________________")
            
            const options: FindManyOptions<Police> = {
              where: {},
              order: {}, 
            };
           /* const baseSort: any = { nom: 'ASC' , prenoms:'ASC' };// Tri par défaut
            if( query.sortKey && query.sortDirection){
                options.order ={ [query.sortKey]: `${query.sortDirection}`}
            }else {
              options.order = baseSort
            }   

            // filtre sur un champs spécifique; Tableau de conditions
            const baseWhere: any = {};
            if (query.acteurId) {
              baseWhere.acteur = { id: parseInt(query.acteurId, 10) }; 
            }
            
            options.where = baseWhere

            console.log("options:",options)
            console.log("_____________________________________")
            */
            return options;
      }
}
