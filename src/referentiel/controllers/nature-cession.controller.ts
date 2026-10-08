import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from '../../common/crud/crud.controller';
import { CreateNatureCessionDto } from '../dto/create-nature-cession.dto';
import { UpdateNatureCessionDto } from '../dto/update-nature-cession.dto';
import { NatureCession } from '../entities/nature-cession.entity';
import { NatureCessionService } from '../services/nature-cession.service';

@ApiTags('NatureCession')
@Controller('nature-cession')
export class NatureCessionController extends CrudController<NatureCession, CreateNatureCessionDto, UpdateNatureCessionDto> {
  constructor(service: NatureCessionService) {
    super(service);
  }
}
