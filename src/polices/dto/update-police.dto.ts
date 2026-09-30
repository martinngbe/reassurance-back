import { PartialType } from '@nestjs/mapped-types';
import { CreatePoliceDto } from './create-police.dto';

export class UpdatePoliceDto extends PartialType(CreatePoliceDto) {}
