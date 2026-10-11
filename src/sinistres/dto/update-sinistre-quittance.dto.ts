import { PartialType } from '@nestjs/mapped-types';
import { CreateSinistreQuittanceDto } from './create-sinistre-quittance.dto';

export class UpdateSinistreQuittanceDto extends PartialType(CreateSinistreQuittanceDto) {}
