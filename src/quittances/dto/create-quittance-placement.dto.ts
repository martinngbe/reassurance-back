import { IsBoolean, IsInt, IsNumber, IsNotEmpty,IsOptional, IsString } from 'class-validator';
import Decimal from 'decimal.js';
import { Exclude } from 'class-transformer';
export class CreateQuittancePlacementDto {
  @IsInt()
  @IsNotEmpty()
  quittanceId!: number;

  @IsInt()
  @IsNotEmpty()
  acteurId!: number;

  @IsInt()
  @IsNotEmpty()
  natureCessionId!: number;

  @IsNumber()
  tauxCession: Decimal= new Decimal(0);

  @IsNumber()
  primeBrute: Decimal= new Decimal(0);
  @IsNumber()
  commissionFixe:  Decimal= new Decimal(0);
  @IsNumber()
  taxeSurPrime:Decimal= new Decimal(0);
  @IsNumber()
  tauxCommission:Decimal= new Decimal(0);
  @IsNumber()
  taxeSurCommission: Decimal= new Decimal(0);
  
  @IsBoolean()
  @IsOptional()
  isAnnule?: boolean;

  @IsString()
  @IsOptional()
  quittanceCessionIdAnnule?: string;
  
  
    // ⛔ Ces champs sont CALCULÉS par le backend → jamais acceptés en entrée
    @Exclude()
    primeNette?: any;
  
    @Exclude()
    primeCedee?: any;
  
    @Exclude()
    primeAcceptee?: any;
  
  
    // @Exclude()
    // formuleVersion?: any;
  
    // @Exclude()
    // calculeLe?: any;
  
    // @Exclude()
    // estEmise?: any;
}
