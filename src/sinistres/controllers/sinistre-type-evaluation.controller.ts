import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from '../../common/crud/crud.controller';
import { SinistreTypeEvaluation } from '../entities/sinistre-type-evaluation.entity';
import { CreateSinistreTypeEvaluationDto } from '../dto/create-sinistre-type-evaluation.dto';
import { UpdateSinistreTypeEvaluationDto } from '../dto/update-sinistre-type-evaluation.dto';
import { SinistreTypeEvaluationService } from '../services/sinistre-type-evaluation.service';
import { FindManyOptions } from 'typeorm';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('SinistreTypeEvaluation')
@Controller('sinistre-type-evaluation')
@Roles("ADMIN","SINISTRE")
export class SinistreTypeEValuationController extends CrudController<SinistreTypeEvaluation, CreateSinistreTypeEvaluationDto, UpdateSinistreTypeEvaluationDto> {
  constructor(service: SinistreTypeEvaluationService) {
    super(service);
  }

    /**
     * 
     * @param query 
     * @returns 
     */
    protected buildOptions(query: any): FindManyOptions<SinistreTypeEvaluation> {
      const options: FindManyOptions<SinistreTypeEvaluation> = {
        where: {},
        order: { code: 'ASC' }, // Tri par défaut
      };
  
      return options;
    }
}
