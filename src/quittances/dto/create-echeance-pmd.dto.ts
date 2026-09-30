import { IsBoolean, IsDateString, IsInt, IsNumber, IsOptional } from 'class-validator';

export class CreateEcheancePmdDto {
  @IsInt()
  quittanceId: number;

  @IsInt()
  @IsOptional()
  quittanceCessionId?: number;

  @IsInt()
  acteurId: number;

  @IsInt()
  numeroTranche: number;

  @IsDateString()
  dateEcheance: string;

  @IsNumber()
  prime: number;

  @IsBoolean()
  @IsOptional()
  isCession?: boolean;

  @IsBoolean()
  @IsOptional()
  isAnnule?: boolean;

  @IsInt()
  @IsOptional()
  echeancePmdIdAnnule?: number;
}
