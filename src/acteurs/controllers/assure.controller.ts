import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from 'src/common/crud/crud.controller';
import { CreateAssureDto } from '../dto/create-assure.dto';
import { UpdateAssureDto } from '../dto/update-assure.dto';
import { Assure } from '../entities/assure.entity';
import { AssureService } from '../services/assure.service';
import { FindManyOptions } from 'typeorm';

@ApiTags('Assure')
@Controller('assure')
export class AssureController extends CrudController<Assure, CreateAssureDto, UpdateAssureDto> {
  constructor(service: AssureService) {
    super(service);
  }

   // les diffentes options ou filtre pour 
      protected buildOptions(query: any): FindManyOptions<Assure> {
        const options: FindManyOptions<Assure> = {
          where: {},
          order: { raisonSociale: 'ASC' }, // Tri par défaut
        };
    
        return options;
      }
}
