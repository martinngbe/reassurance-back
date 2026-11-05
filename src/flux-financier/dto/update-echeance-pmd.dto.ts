import { PartialType } from '@nestjs/mapped-types';
import { CreateEcheancePmdDto } from './create-echeance-pmd.dto';

export class UpdateEcheancePmdDto extends PartialType(CreateEcheancePmdDto) {}
