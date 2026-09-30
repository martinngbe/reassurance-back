import { PartialType } from '@nestjs/mapped-types';
import { CreateCompteTraiteDto } from './create-compte-traite.dto';

export class UpdateCompteTraiteDto extends PartialType(CreateCompteTraiteDto) {}
