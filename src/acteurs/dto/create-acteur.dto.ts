import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateActeurDto {
  @IsString()
  @IsNotEmpty()
  sigle: string;

  @IsString()
  @IsNotEmpty()
  raisonSociale: string;

  @IsEmail()
  email: string;

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
  @IsOptional()
  idPays?: number;

  @IsInt()
  @IsOptional()
  idDomaineActivite?: number;
}
