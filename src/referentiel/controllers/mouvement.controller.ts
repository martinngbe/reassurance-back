import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from '../../common/crud/crud.controller';
import { Mouvement } from '../entities/mouvement.entity';
import { MouvementService } from '../services/mouvement.service';
import { CreateMouvementDto } from '../dto/create-mouvement.dto';
import { UpdateMouvementDto } from '../dto/update-mouvement.dto';
import { FindManyOptions } from 'typeorm';

@ApiTags('Mouvement')
@Controller('mouvement')
export class MouvementController extends CrudController<Mouvement, CreateMouvementDto, UpdateMouvementDto> {
  constructor(service: MouvementService) {
    super(service);
  }

     protected buildOptions(query: any): FindManyOptions<Mouvement> {
              const options: FindManyOptions<Mouvement> = {
                where: {},
                order: { code: 'ASC' }, // Tri par défaut
              };
          
              return options;
            }
}
