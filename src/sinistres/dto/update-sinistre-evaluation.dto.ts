import { PartialType } from '@nestjs/mapped-types';
import { CreateSinistreEvaluationDto } from './create-sinistre-evaluation.dto';

export class UpdateSinistreEvaluationDto extends PartialType(CreateSinistreEvaluationDto) {}
