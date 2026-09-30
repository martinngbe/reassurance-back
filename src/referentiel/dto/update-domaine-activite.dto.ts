import { PartialType } from '@nestjs/mapped-types';
import { CreateDomaineActiviteDto } from './create-domaine-activite.dto';

export class UpdateDomaineActiviteDto extends PartialType(CreateDomaineActiviteDto) {}
