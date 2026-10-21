import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateTempObjetAssureDto {
  @IsString()
  @IsNotEmpty()
  libelle!: string;

}
