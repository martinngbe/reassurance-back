import { IsBoolean, IsInt, IsNumber, IsOptional } from 'class-validator';

export class CreateCompteTraiteDto {
  @IsInt()
  @IsOptional()
  quittanceRetroCessionId?: number;

  @IsInt()
  idCompteType!: number;

  @IsInt()
  acteurId!: number;

  @IsInt()
  DeviseId!: number;

  @IsNumber()
  coursDevise: number=0;

  @IsBoolean()
  @IsOptional()
  isCession?: boolean;

  @IsBoolean()
  @IsOptional()
  isProportionnel?: boolean;

  @IsBoolean()
  @IsOptional()
  isEnNotreFaveur?: boolean;

  @IsBoolean()
  @IsOptional()
  isAnnule?: boolean;

  @IsInt()
  @IsOptional()
  compteTratieIdAnnule?: number;

  @IsNumber()
  @IsOptional()
  solde?: number;
}
