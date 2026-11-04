import { PartialType } from '@nestjs/mapped-types';
import { CreateNaturePlacementDto } from './create-nature-placement.dto';

export class UpdateNaturePlacementDto extends PartialType(CreateNaturePlacementDto) {}
