import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from '../../common/crud/crud.controller';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { SinistreActeur } from '../entities/sinistre-acteur.entity';
import { SinistreActeurService } from '../services/sinistre-acteur.service';
import { CreateSinistreActeurDto } from '../dto/create-sinistre-acteur.dto';
import { UpdateSinistreActeurDto } from '../dto/update-sinistre-acteur.dto';

@ApiTags('Sinistre Acteur')
@Controller('sinistre-acteur')
@Roles('GESTIONNAIRE-SINSITRE') // seul le gestionnaire sinistre est habillité
export class SinistreActeurController extends CrudController<
  SinistreActeur,
  CreateSinistreActeurDto,
  UpdateSinistreActeurDto
> {
  constructor(service: SinistreActeurService) {
    super(service);
  }
}