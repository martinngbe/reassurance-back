import { PartialType } from '@nestjs/mapped-types';
import {  CreateBrancheRetroCessionDto } from './create-branche-retro-cession.dto';

export class UpdateBrancheRetroCessionDto extends
 PartialType(CreateBrancheRetroCessionDto) {}
