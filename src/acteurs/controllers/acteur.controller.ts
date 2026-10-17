import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from 'src/common/crud/crud.controller';
import { Acteur } from '../entities/acteur.entity';
import { FindManyOptions } from 'typeorm';
import { CreateActeurDto } from '../dto/create-acteur.dto';
import { UpdateActeurDto } from '../dto/update-acteur.dto';
import { ActeurService } from '../services/acteur.service';

@ApiTags('Acteur')
@Controller('acteur')
export class ActeurController extends CrudController<Acteur, CreateActeurDto, UpdateActeurDto> {
  constructor(service: ActeurService) {
    super(service);
  }

   // les diffentes options ou filtre pour 
      protected buildOptions(query: any): FindManyOptions<Acteur> {
        const options: FindManyOptions<Acteur> = {
          where: {},
          order: { raisonSociale: 'ASC' }, // Tri par défaut
        };
    
        return options;
      }
}
