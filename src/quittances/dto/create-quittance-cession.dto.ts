import { IsBoolean, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateQuittanceCessionDto {
  @IsInt()
  quittanceId: number;

  @IsInt()
  acteurId: number;

  @IsInt()
  natureCessionId: number;

  @IsNumber()
  taux: number;

  @IsBoolean()
  @IsOptional()
  isCession?: boolean;

  @IsBoolean()
  @IsOptional()
  isProportionnel?: boolean;

  @IsBoolean()
  @IsOptional()
  isFac?: boolean;

  @IsBoolean()
  @IsOptional()
  isAnnule?: boolean;

  @IsString()
  @IsOptional()
  quittanceCessionIdAnnule?: string;
}
