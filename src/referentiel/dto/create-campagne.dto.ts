import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCampagneDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  libelle: string;
}
