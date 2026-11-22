import { PartialType } from '@nestjs/mapped-types';
import { CreateSousBrancheDto } from './create-sous-branche.dto';
import { CreateCessionLegaleDto } from './create-cession-legale.dto';

export class UpdateCessionLegaleDto extends 
PartialType(CreateCessionLegaleDto) {}
