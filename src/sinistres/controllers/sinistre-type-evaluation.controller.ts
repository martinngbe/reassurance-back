import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from '../../common/crud/crud.controller';
import { SinistreTypeEvaluation } from '../entities/sinistre-type-evaluation.entity';
import { CreateSinistreTypeEvaluationDto } from '../dto/create-sinistre-type-evaluation.dto';
import { UpdateSinistreTypeEvaluationDto } from '../dto/update-sinistre-type-evaluation.dto';
import { SinistreTypeEvaluationService } from '../services/sinistre-type-evaluation.service';

@ApiTags('SinistreTypeEvaluation')
@Controller('sinistre-type-evaluation')
export class SinistreTypeEValuationController extends CrudController<SinistreTypeEvaluation, CreateSinistreTypeEvaluationDto, UpdateSinistreTypeEvaluationDto> {
  constructor(service: SinistreTypeEvaluationService) {
    super(service);
  }
}
