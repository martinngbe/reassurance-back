import { IsBoolean, IsInt, IsNumber, IsOptional } from 'class-validator';

export class CreateBordereauDto {
  @IsInt()
  @IsOptional()
  idBordereauReference?: number;

  @IsInt()
  @IsOptional()
  quittanceId?: number;

  @IsInt()
  @IsOptional()
  quittanceCessionId?: number;

  @IsNumber()
  montant: number=0;

  @IsBoolean()
  @IsOptional()
  isCession?: boolean;

  @IsBoolean()
  @IsOptional()
  isProportionnel?: boolean;

  @IsBoolean()
  @IsOptional()
  isManuel?: boolean;

  @IsBoolean()
  @IsOptional()
  isAnnule?: boolean;

  @IsInt()
  @IsOptional()
  bordereauIdAnnule?: number;
}
