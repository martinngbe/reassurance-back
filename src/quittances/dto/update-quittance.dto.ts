import { PartialType } from '@nestjs/mapped-types';
import { CreateQuittanceDto } from './create-quittance.dto';

export class UpdateQuittanceDto extends PartialType(CreateQuittanceDto) {}
