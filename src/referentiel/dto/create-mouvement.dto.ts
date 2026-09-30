import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMouvementDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  libelle: string;
}
