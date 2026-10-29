import { PartialType } from '@nestjs/mapped-types';
import { CreateCompteDetailDto } from './create-compte-detail.dto';

export class UpdateCompteDetailDto extends PartialType(CreateCompteDetailDto) {}
