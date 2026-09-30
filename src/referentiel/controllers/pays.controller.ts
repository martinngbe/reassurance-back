import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from '../../common/crud/crud.controller';
import { Pays } from '../entities/pays.entity';
import { PaysService } from '../services/pays.service';
import { CreatePaysDto } from '../dto/create-pays.dto';
import { UpdatePaysDto } from '../dto/update-pays.dto';

@ApiTags('Pays')
@Controller('pays')
export class PaysController extends CrudController<Pays, CreatePaysDto, UpdatePaysDto> {
  constructor(service: PaysService) {
    super(service);
  }
}
