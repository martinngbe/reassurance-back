import { PartialType } from '@nestjs/mapped-types';
import { CreateTempPoliceDto } from './create-temp-police.dto';

export class UpdateTempPoliceDto extends PartialType(CreateTempPoliceDto) {}
