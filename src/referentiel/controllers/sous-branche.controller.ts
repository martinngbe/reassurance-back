import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from '../../common/crud/crud.controller';
import { SousBranche } from '../entities/sous-branche.entity';
import { SousBrancheService } from '../services/sous-branche.service';
import { CreateSousBrancheDto } from '../dto/create-sous-branche.dto';
import { UpdateSousBrancheDto } from '../dto/update-sous-branche.dto';

@ApiTags('SousBranche')
@Controller('sous-branches')
export class SousBrancheController extends CrudController<SousBranche, CreateSousBrancheDto, UpdateSousBrancheDto> {
  constructor(service: SousBrancheService) {
    super(service);
  }
}
