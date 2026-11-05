import { Exclude } from 'class-transformer';
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

  @IsDateString()
  @IsOptional()
  dateEmission!: string;

  @IsDateString()
  @IsOptional()
  dateEffet!: string;

  @IsDateString()
  @IsOptional()
  dateEcheance!: string;

  @IsNumber()
  @IsNotEmpty()
  coursDevise: number=1;

  @IsInt()
  @IsOptional()
  avisEcheance: number=0;

  @IsNumber()
  @IsOptional()
  capitaux: number=0;

  @IsNumber()
  @IsOptional()
  nombrePlein: number=0;

  @IsNumber()
  @IsOptional()
  lci: number=0;

  @IsNumber()
  @IsOptional()
  smp: number=0;

  @IsNumber()
  @IsOptional()
  limite: number=0;

  @IsNumber()
  @IsOptional()
  retention: number=0;

  @IsNumber()
  conservation: number=0;

  @IsNumber()
  @IsOptional()
  capacite: number=0;

  @IsNumber()
  @IsOptional()
  estimationPrime: number=0;

  @IsNumber()
  @IsOptional()
  tauxCedante: number=0;

  @IsNumber()
  @IsOptional()
  tauxAccepte: number=0;

  //@IsNumber()
  //@IsOptional()
  //tauxCession: number = 0;

  //@IsNumber()
  //@IsOptional()
  //tauxRetention: number = 0;


  @IsNumber()
  @IsOptional()
  tauxCommission: number=0;

  @IsNumber()
  @IsOptional()
  taxeSurCommission: number=0;

  @IsNumber()
  @IsOptional()
  primeBrute: number=0;

  // @IsNumber()
  // primeNette: number=0;

  @IsNumber()
  @IsOptional()
  taxeSurPrime: number=0;

  @IsInt()
  @IsOptional()
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

  @IsBoolean()
  @IsOptional()
  isAnnule?: boolean;

  @IsInt()
  @IsOptional()
  quittanceIdAnnule?: number;




  // ⛔ Ces champs sont CALCULÉS par le backend → jamais acceptés en entrée
  @Exclude()
  primeNette?: any;

  @Exclude()
  primeCedee?: any;

  @Exclude()
  primeAcceptee?: any;

  @Exclude()
  commissionFixe?: any;

  @Exclude()
  formuleVersion?: any;

  @Exclude()
  calculeLe?: any;

  @Exclude()
  estEmise?: any;
}
