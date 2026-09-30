import { PartialType } from '@nestjs/mapped-types';
import { CreateSinistreStatutDto } from './create-sinistre-statut.dto';

export class UpdateSinistreStatutDto extends PartialType(CreateSinistreStatutDto) {}
