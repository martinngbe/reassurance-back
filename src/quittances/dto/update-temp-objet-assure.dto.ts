import { PartialType } from '@nestjs/mapped-types';
import { CreateTempObjetAssureDto } from './create-temp-objet-assure.dto';

export class UpdateTempObjetAssureDto extends PartialType(CreateTempObjetAssureDto) {}
