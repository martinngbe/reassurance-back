import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDomaineActiviteDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  libelle: string;
}
