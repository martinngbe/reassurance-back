import { IsNotEmpty, IsString , IsBoolean } from 'class-validator';

export class CreateBrancheRetroCessionDto {
  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsString()
  @IsNotEmpty()
  libelle!: string;

  @IsBoolean()
  isIard!: boolean;

  @IsBoolean()
  isRetroConventionnelle!:boolean

}
