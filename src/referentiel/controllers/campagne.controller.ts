import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from '../../common/crud/crud.controller';
import { Campagne } from '../entities/campagne.entity';
import { CampagneService } from '../services/campagne.service';
import { CreateCampagneDto } from '../dto/create-campagne.dto';
import { UpdateCampagneDto } from '../dto/update-campagne.dto';

@ApiTags('Campagne')
@Controller('campagnes')
export class CampagneController extends CrudController<Campagne, CreateCampagneDto, UpdateCampagneDto> {
  constructor(service: CampagneService) {
    super(service);
  }
}
