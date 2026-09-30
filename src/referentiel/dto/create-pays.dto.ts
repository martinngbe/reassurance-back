import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreatePaysDto {
  @IsString()
  @IsNotEmpty()
  indicatif: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  libelle: string;

  @IsInt()
  idRegion: number;
}
