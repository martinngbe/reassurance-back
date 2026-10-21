import { PartialType } from '@nestjs/mapped-types';
import { CreateObjetAssureDto } from './create-objet-assure.dto';

export class UpdateObjetAssureDto extends PartialType(CreateObjetAssureDto) {}
