import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateSousBrancheDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  libelle: string;

  @IsInt()
  idBranche: number;
}
