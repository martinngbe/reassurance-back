import { PartialType } from '@nestjs/mapped-types';
import { CreateCampagneDto } from './create-campagne.dto';

export class UpdateCampagneDto extends PartialType(CreateCampagneDto) {}
