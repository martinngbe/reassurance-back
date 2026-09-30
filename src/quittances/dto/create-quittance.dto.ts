import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateQuittanceDto {
  @IsString()
  @IsNotEmpty()
  numero: string;

  @IsInt()
  idMouvement: number;

  @IsInt()
  idPolice: number;

  @IsInt()
  deviseId: number;

  @IsBoolean()
  @IsOptional()
  isCession?: boolean;

  @IsBoolean()
  @IsOptional()
  isProportionnel?: boolean;

  @IsBoolean()
  @IsOptional()
  isFac?: boolean;

  @IsDateString()
  dateEmission: string;

  @IsDateString()
  dateEffet: string;

  @IsDateString()
  dateEcheance: string;

  @IsNumber()
  coursDevise: number;

  @IsInt()
  avisEcheance: number;

  @IsNumber()
  capitaux: number;

  @IsNumber()
  limiteCapitauxImpliques: number;

  @IsNumber()
  ici: number;

  @IsNumber()
  smp: number;

  @IsNumber()
  limite: number;

  @IsNumber()
  retention: number;

  @IsNumber()
  conservation: number;

  @IsNumber()
  capacite: number;

  @IsNumber()
  estimationPrime: number;

  @IsNumber()
  tauxCedante: number;

  @IsNumber()
  tauxAccepte: number;

  @IsNumber()
  tauxCommission: number;

  @IsNumber()
  taxeSurCommission: number;

  @IsNumber()
  primeBrute: number;

  @IsNumber()
  primeNette: number;

  @IsNumber()
  taxeSurPrime: number;

  @IsInt()
  nombreEcheancePmd: number;

  @IsNumber()
  @IsOptional()
  sinistreAuComptant?: number;

  @IsNumber()
  @IsOptional()
  avisSinistre?: number;

  @IsNumber()
  @IsOptional()
  aliment?: number;

  @IsBoolean()
  @IsOptional()
  isAnnule?: boolean;

  @IsInt()
  @IsOptional()
  idQuittanceAnnule?: number;
}
