import { PartialType } from '@nestjs/mapped-types';
import { CreateReglementDetailDto } from './create-reglement-detail.dto';

export class UpdateReglementDetailDto extends PartialType(CreateReglementDetailDto) {}
