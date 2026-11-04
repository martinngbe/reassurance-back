import { PartialType } from '@nestjs/mapped-types';
import { CreateQuittancePlacementDto } from './create-quittance-placement.dto';

export class UpdateQuittancePlacementDto extends PartialType(CreateQuittancePlacementDto) {}
