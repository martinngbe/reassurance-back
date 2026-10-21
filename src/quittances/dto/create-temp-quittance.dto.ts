import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTempQuittanceDto {
  @IsString()
  @IsNotEmpty()
  numero!: string;

  @IsInt()
  @IsNotEmpty()
  mouvementId!: number;

  @IsInt()
  @IsNotEmpty()
  policeId!: number;

  @IsInt()
  @IsNotEmpty()
  deviseId!: number;

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
  dateEmission!: string;

  @IsDateString()
  dateEffet!: string;

  @IsDateString()
  dateEcheance!: string;

  @IsNumber()
  @IsNotEmpty()
  coursDevise: number=1;

  @IsInt()
  @IsNotEmpty()
  avisEcheance!: number;

  @IsNumber()
  capitaux: number=0;

  @IsNumber()
  limiteCapitauxImpliques: number=0;

  @IsNumber()
  ici: number=0;

  @IsNumber()
  smp: number=0;

  @IsNumber()
  limite: number=0;

  @IsNumber()
  retention: number=0;

  @IsNumber()
  conservation: number=0;

  @IsNumber()
  capacite: number=0;

  @IsNumber()
  estimationPrime: number=0;

  @IsNumber()
  tauxCedante: number=0;

  @IsNumber()
  tauxAccepte: number=0;

  @IsNumber()
  tauxCommission: number=0;

  @IsNumber()
  taxeSurCommission: number=0;

  @IsNumber()
  primeBrute: number=0;

  @IsNumber()
  primeNette: number=0;

  @IsNumber()
  taxeSurPrime: number=0;

  @IsInt()
  nombreEcheancePmd: number=0;

  @IsNumber()
  @IsOptional()
  sinistreAuComptant?: number;

  @IsNumber()
  @IsOptional()
  avisSinistre?: number;

  @IsNumber()
  @IsOptional()
  aliment?: number;

}
