import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateActeurDto {

  @IsString()
  @IsOptional()
  numero!: string;

  @IsString()
  @IsOptional()
  sigle!: string;

  @IsString()
  @IsNotEmpty()
  raisonSociale!: string;

  @IsEmail()
  @IsOptional()
  email!: string;


  @IsString()
  @IsOptional()
  adresse!: string;

  @IsString()
  @IsOptional()
  telephone!: string;

  @IsString()
  @IsOptional()
  siteweb!: string;

  @IsString()
  @IsOptional()
  coordonneesBancaire!: string;

  @IsBoolean()
  @IsOptional()
  isCourtier?: boolean;

  @IsBoolean()
  @IsOptional()
  isCompagnieAssurance?: boolean;

  @IsBoolean()
  @IsOptional()
  isReassureur?: boolean;

  @IsInt()
  @IsNotEmpty()
  idPays?: number;

}
