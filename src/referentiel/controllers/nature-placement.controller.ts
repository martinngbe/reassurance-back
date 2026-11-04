import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from '../../common/crud/crud.controller';
import { NaturePlacement } from '../entities/nature-placement.entity';
import { NaturePlacementService } from '../services/nature-placement.service';
import { FindManyOptions } from 'typeorm';
import { CreateNaturePlacementDto } from '../dto/create-nature-placement.dto';
import { UpdateNaturePlacementDto } from '../dto/update-nature-placement.dto';

@ApiTags('NaturePlacement')
@Controller('nature-placement')
export class NaturePlacementController extends CrudController<NaturePlacement, CreateNaturePlacementDto, UpdateNaturePlacementDto> {
  constructor(service: NaturePlacementService) {
    super(service);
  }
     protected buildOptions(query: any): FindManyOptions<NaturePlacement> {
                const options: FindManyOptions<NaturePlacement> = {
                  where: {},
                  order: { code: 'ASC' }, // Tri par défaut
                };
            
                return options;
              }
}
