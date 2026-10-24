import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from 'src/common/crud/crud.controller';
import { FindManyOptions } from 'typeorm';
import { CreateTempPoliceDto } from '../dto/create-temp-police.dto';
import { UpdateTempPoliceDto } from '../dto/update-temp-police.dto';
import { TempPolice } from '../entities/temp-police.entity';
import { TempPoliceService } from '../services/temp-police.service';

@ApiTags('empPolice')
@Controller('temp-police')
export class TempPoliceController extends CrudController<TempPolice, CreateTempPoliceDto, UpdateTempPoliceDto> {
  constructor(service: TempPoliceService) {
    super(service);
  }
     // les diffentes options ou filtre pour 
      protected buildOptions(query: any): FindManyOptions<TempPolice> {        
            console.log("_____________________________________")
            console.log("TempPoliceController.buildOptions")
            console.log("query:",query)
            console.log("_____________________________________")
            
            const options: FindManyOptions<TempPolice> = {
              where: {},
              order: {}, 
            };
            const baseSort: any = { createdAt: 'DESC'  };// Tri par défaut
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
            if (query.assureId) {
              baseWhere.assure = { id: parseInt(query.assureId, 10) }; 
            }
            
            options.where = baseWhere

            console.log("options:",options)
            console.log("_____________________________________")
            
            return options;
      }
}
