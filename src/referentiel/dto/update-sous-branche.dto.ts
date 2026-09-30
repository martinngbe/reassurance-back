import { PartialType } from '@nestjs/mapped-types';
import { CreateSousBrancheDto } from './create-sous-branche.dto';

export class UpdateSousBrancheDto extends PartialType(CreateSousBrancheDto) {}
