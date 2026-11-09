import { PartialType } from '@nestjs/mapped-types';
import { CreateTempCompteDetailDto } from './create-temp-compte-detail.dto';

export class UpdateTempCompteDetailDto extends PartialType(CreateTempCompteDetailDto) {}
