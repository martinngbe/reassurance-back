import { PartialType } from '@nestjs/mapped-types';
import { CreateNatureCessionDto } from './create-nature-cession.dto';

export class UpdateNatureCessionDto extends PartialType(CreateNatureCessionDto) {}
