import { PartialType } from '@nestjs/mapped-types';
import { CreateSinistreActeurDto } from './create-sinistre-acteur.dto';

export class UpdateSinistreActeurDto extends PartialType(CreateSinistreActeurDto) {}
