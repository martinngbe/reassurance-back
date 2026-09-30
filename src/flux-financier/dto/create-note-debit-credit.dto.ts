import { IsBoolean, IsInt, IsNumber, IsOptional } from 'class-validator';

export class CreateNoteDebitCreditDto {
  @IsInt()
  @IsOptional()
  idNoteDebitCreditReference?: number;

  @IsInt()
  @IsOptional()
  quittanceId?: number;

  @IsInt()
  @IsOptional()
  quittanceCessionId?: number;

  @IsInt()
  @IsOptional()
  idReference?: number;

  @IsInt()
  @IsOptional()
  bordereauId?: number;

  @IsInt()
  @IsOptional()
  compteTraiteId?: number;

  @IsInt()
  @IsOptional()
  echeancePmdId?: number;

  @IsInt()
  @IsOptional()
  sinistreId?: number;

  @IsInt()
  @IsOptional()
  sinistreEvaluationId?: number;

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
  isSinistre?: boolean;

  @IsBoolean()
  @IsOptional()
  isDebit?: boolean;

  @IsNumber()
  montant: number;

  @IsBoolean()
  @IsOptional()
  isAnnule?: boolean;

  @IsInt()
  @IsOptional()
  noteDebitCreditIdAnnule?: number;
}
