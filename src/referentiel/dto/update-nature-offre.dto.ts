import { PartialType } from '@nestjs/mapped-types';
import { CreateNatureOffreDto } from './create-nature-offre.dto';

export class UpdateNatureOffreDto extends PartialType(CreateNatureOffreDto) {}
