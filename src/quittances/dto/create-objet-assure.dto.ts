import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateObjetAssureDto {
  @IsString()
  @IsNotEmpty()
  libelle!: string;

}
