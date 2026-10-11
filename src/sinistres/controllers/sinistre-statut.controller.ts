import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from '../../common/crud/crud.controller';
import { SinistreStatut } from '../entities/sinistre-statut.entity';
import { SinistreStatutService } from '../services/sinistre-statut.service';
import { CreateSinistreStatutDto } from '../dto/create-sinistre-statut.dto';
import { UpdateSinistreStatutDto } from '../dto/update-sinistre-statut.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('SinistreStatut')
@Roles('GESTIONNAIRE-SINSITRE', 'ADMIN') // seul ADMIN et le gestionnaire sinistre est habillité
@Controller('sinistre-statut')
export class SinistreStatutController extends CrudController<SinistreStatut, CreateSinistreStatutDto, UpdateSinistreStatutDto> {
  constructor(service: SinistreStatutService) {
    super(service);
  }
}
