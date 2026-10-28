import { IsNotEmpty, IsString ,IsBoolean} from 'class-validator';

export class CreateNatureOffreDto {
  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsString()
  @IsNotEmpty()
  libelle!: string;

  @IsBoolean()
  isFacultative!: boolean;

  @IsBoolean()
  isFacObligatoire!: boolean;

  @IsBoolean()
  isProportionnelle!: boolean;

  @IsBoolean()
  isEdp!: boolean;

  @IsBoolean()
  isQuotePart!: boolean;

  @IsBoolean()
  isXs!: boolean;

}



