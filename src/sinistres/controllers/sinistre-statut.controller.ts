import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from '../../common/crud/crud.controller';
import { SinistreStatut } from '../entities/sinistre-statut.entity';
import { SinistreStatutService } from '../services/sinistre-statut.service';
import { CreateSinistreStatutDto } from '../dto/create-sinistre-statut.dto';
import { UpdateSinistreStatutDto } from '../dto/update-sinistre-statut.dto';

@ApiTags('SinistreStatut')
@Controller('sinistre-statuts')
export class SinistreStatutController extends CrudController<SinistreStatut, CreateSinistreStatutDto, UpdateSinistreStatutDto> {
  constructor(service: SinistreStatutService) {
    super(service);
  }
}
