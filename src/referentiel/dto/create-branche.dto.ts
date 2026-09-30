import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBrancheDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  libelle: string;
}
