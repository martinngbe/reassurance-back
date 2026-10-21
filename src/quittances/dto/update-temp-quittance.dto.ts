import { PartialType } from '@nestjs/mapped-types';
import { CreateTempQuittanceDto } from './create-temp-quittance.dto';

export class UpdateTempQuittanceDto extends PartialType(CreateTempQuittanceDto) {}
