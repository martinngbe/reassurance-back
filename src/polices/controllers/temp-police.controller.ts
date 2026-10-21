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
          
            return options;
      }
}
