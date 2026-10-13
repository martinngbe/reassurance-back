import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from '../../common/crud/crud.controller';
import { Region } from '../entities/region.entity';
import { RegionService } from '../services/region.service';
import { CreateRegionDto } from '../dto/create-region.dto';
import { UpdateRegionDto } from '../dto/update-region.dto';
import { FindManyOptions } from 'typeorm';

@ApiTags('Region')
@Controller('region')
export class RegionController extends CrudController<Region, CreateRegionDto, UpdateRegionDto> {
  constructor(service: RegionService) {
    super(service);
  }
   protected buildOptions(query: any): FindManyOptions<Region> {
                    const options: FindManyOptions<Region> = {
                      where: {},
                      order: { code: 'ASC' }, // Tri par défaut
                    };
                
                    return options;
                  }
}
