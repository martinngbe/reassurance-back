import { PartialType } from '@nestjs/mapped-types';
import { CreateSinistreTypeEvaluationDto } from './create-sinistre-type-evaluation.dto';

export class UpdateSinistreTypeEvaluationDto extends PartialType(CreateSinistreTypeEvaluationDto) {}
