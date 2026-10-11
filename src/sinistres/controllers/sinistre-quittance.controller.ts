import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from '../../common/crud/crud.controller';
import { SinistreQuittanceService } from '../services/sinistre-quittance.service';
import { CreateSinistreQuittanceDto } from '../dto/create-sinistre-quittance.dto';
import { SinistreQuittance } from '../entities/sinistre-quittance.entity';
import { UpdateSinistreQuittanceDto } from '../dto/update-sinistre-quittance.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('Sinistre Quittance')
@Controller('sinistre-quittance')
@Roles('GESTIONNAIRE-SINSITRE') // seul le gestionnaire sinistre est habillité
export class SinistreQuittanceController extends CrudController<
  SinistreQuittance,
  CreateSinistreQuittanceDto,
  UpdateSinistreQuittanceDto
> {
  constructor(service: SinistreQuittanceService) {
    super(service);
  }
}