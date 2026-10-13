import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from '../../common/crud/crud.controller';

import { Devise } from '../entities/devise.entity';
import { DeviseService } from '../services/devise.service';
import { CreateDeviseDto } from '../dto/create-devise.dto';
import { UpdateDeviseDto } from '../dto/update-devise.dto';
import { FindManyOptions } from 'typeorm';

@ApiTags('Devise')
@Controller('devise')
export class DeviseController extends CrudController<Devise, CreateDeviseDto, UpdateDeviseDto> {
  constructor(service: DeviseService) {
    super(service);
  }
  protected buildOptions(query: any): FindManyOptions<Devise> {
          const options: FindManyOptions<Devise> = {
            where: {},
            order: { code: 'ASC' }, // Tri par défaut
          };
      
          return options;
        }
}
