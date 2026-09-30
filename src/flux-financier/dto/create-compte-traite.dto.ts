import { IsBoolean, IsInt, IsNumber, IsOptional } from 'class-validator';

export class CreateCompteTraiteDto {
  @IsInt()
  @IsOptional()
  idQuittanceRetroCession?: number;

  @IsInt()
  idCompteType: number;

  @IsInt()
  acteurId: number;

  @IsInt()
  idDeviseId: number;

  @IsNumber()
  coursDevise: number;

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
  idCompteTratieAnnule?: number;

  @IsNumber()
  @IsOptional()
  solde?: number;
}
