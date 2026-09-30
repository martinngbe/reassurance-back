import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNatureCessionDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  libelle: string;
}
