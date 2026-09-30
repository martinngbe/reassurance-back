import { PartialType } from '@nestjs/mapped-types';
import { CreateSinistreReglementDto } from './create-sinistre-reglement.dto';

export class UpdateSinistreReglementDto extends PartialType(CreateSinistreReglementDto) {}
