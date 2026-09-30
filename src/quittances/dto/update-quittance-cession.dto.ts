import { PartialType } from '@nestjs/mapped-types';
import { CreateQuittanceCessionDto } from './create-quittance-cession.dto';

export class UpdateQuittanceCessionDto extends PartialType(CreateQuittanceCessionDto) {}
