import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCompteTypeDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  libelle: string;
}
