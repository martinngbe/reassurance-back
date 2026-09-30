import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from '../../common/crud/crud.controller';
import { CompteType } from '../entities/compte-type.entity';
import { CompteTypeService } from '../services/compte-type.service';
import { CreateCompteTypeDto } from '../dto/create-compte-type.dto';
import { UpdateCompteTypeDto } from '../dto/update-compte-type.dto';

@ApiTags('CompteType')
@Controller('compte-types')
export class CompteTypeController extends CrudController<CompteType, CreateCompteTypeDto, UpdateCompteTypeDto> {
  constructor(service: CompteTypeService) {
    super(service);
  }
}
