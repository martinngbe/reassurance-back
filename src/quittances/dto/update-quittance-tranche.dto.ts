import { PartialType } from '@nestjs/mapped-types';
import { CreateQuittanceTrancheDto } from './create-quittance-tranche.dto';

export class UpdateQuittanceTrancheDto extends PartialType(CreateQuittanceTrancheDto) {}
