import { IsNotEmpty, IsString ,IsBoolean} from 'class-validator';

export class CreateNatureOffreDto {
  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsString()
  @IsNotEmpty()
  libelle!: string;

  @IsBoolean()
  isFacultative: boolean=false;

  @IsBoolean()
  isFacObligatoire: boolean=false;

  @IsBoolean()
  isProportionnelle: boolean=false;

}



