import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from '../../common/crud/crud.controller';
import { Sinistre } from '../entities/sinistre.entity';
import { SinistreService } from '../services/sinistre.service';
import { CreateSinistreDto } from '../dto/create-sinistre.dto';
import { UpdateSinistreDto } from '../dto/update-sinistre.dto';

@ApiTags('Sinistre')
@Controller('sinistres')
export class SinistreController extends CrudController<Sinistre, CreateSinistreDto, UpdateSinistreDto> {
  constructor(service: SinistreService) {
    super(service);
  }
}
