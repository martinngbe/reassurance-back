import { PartialType } from '@nestjs/mapped-types';
import { CreateCompteRubriqueDto } from './create-compte-rubrique.dto';

export class UpdateCompteRubriqueDto extends PartialType(CreateCompteRubriqueDto) {}
