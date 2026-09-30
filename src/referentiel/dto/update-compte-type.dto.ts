import { PartialType } from '@nestjs/mapped-types';
import { CreateCompteTypeDto } from './create-compte-type.dto';

export class UpdateCompteTypeDto extends PartialType(CreateCompteTypeDto) {}
