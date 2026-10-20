import { IsEmail, IsNotEmpty, IsString ,IsInt,IsOptional,} from 'class-validator';

export class CreateAssureDto {
  @IsString()
  @IsNotEmpty()
  sigle!: string;

  @IsString()
  @IsNotEmpty()
  raisonSociale!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsOptional()
  numero!: string;

  @IsString()
  @IsOptional()
  adresse!: string;

  @IsString()
  @IsOptional()
  localite!: string;

  @IsString()
  @IsOptional()
  quartier!: string;

  @IsString()
  @IsOptional()
  rue!: string;

  @IsString()
  @IsOptional()
  description!: string;

  @IsString()
  @IsOptional()
  telephone!: string;


  @IsInt()
  @IsNotEmpty()
  idPays?: number;

  @IsInt()
  @IsNotEmpty()
  domaineActiviteId?: number;
}
