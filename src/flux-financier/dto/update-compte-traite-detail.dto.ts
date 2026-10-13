import { PartialType } from '@nestjs/mapped-types';
import { CreateCompteTraiteDetailDto } from './create-compte-traite-detail.dto';

export class UpdateCompteTraiteDetailDto extends PartialType(CreateCompteTraiteDetailDto) {}
