import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from '../../common/crud/crud.controller';
// import { SinistreDeclarationService } from '../services/sinistre-declaration.service';
// import { CreateSinistreDeclarationDto } from '../dto/create-sinistre-declaration.dto';
// import { UpdateSinistreDeclarationDto } from '../dto/update-sinistre-declaration.dto';
import { Sinistre } from '../entities/sinistre.entity';
import { CreateSinistreDto } from '../dto/create-sinistre.dto';
import { UpdateSinistreDto } from '../dto/update-sinistre.dto';
import { SinistreService } from '../services/sinistre.service';

@ApiTags('Sinistre')
@Controller('sinistre')
export class SinistreController extends CrudController<
  Sinistre,
  CreateSinistreDto,
  UpdateSinistreDto
> {
  constructor(service: SinistreService) {
    super(service);
  }
}
