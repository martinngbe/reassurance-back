import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from '../../common/crud/crud.controller';
import { DomaineActivite } from '../entities/domaine-activite.entity';
import { DomaineActiviteService } from '../services/domaine-activite.service';
import { CreateDomaineActiviteDto } from '../dto/create-domaine-activite.dto';
import { UpdateDomaineActiviteDto } from '../dto/update-domaine-activite.dto';
import { FindManyOptions } from 'typeorm';

@ApiTags('DomaineActivite')
@Controller('domaine-activite')
export class DomaineActiviteController extends CrudController<DomaineActivite, CreateDomaineActiviteDto, UpdateDomaineActiviteDto> {
  constructor(service: DomaineActiviteService) {
    super(service);
  }

   protected buildOptions(query: any): FindManyOptions<DomaineActivite> {
            const options: FindManyOptions<DomaineActivite> = {
              where: {},
              order: { code: 'ASC' }, // Tri par défaut
            };
        
            return options;
          }
}
