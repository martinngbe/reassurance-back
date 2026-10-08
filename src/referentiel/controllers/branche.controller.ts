import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from '../../common/crud/crud.controller';

import { Branche } from '../entities/branche.entity';
import { BrancheService } from '../services/branche.service';
import { CreateBrancheDto } from '../dto/create-branche.dto';
import { UpdateBrancheDto } from '../dto/update-branche.dto';

@ApiTags('Branche')
@Controller('branche')
export class BrancheController extends CrudController<Branche, CreateBrancheDto, UpdateBrancheDto> {
  constructor(service: BrancheService) {
    super(service);
  }
}
