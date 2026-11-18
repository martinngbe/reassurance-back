import { IsBoolean, IsInt, IsNumber, IsNotEmpty,IsOptional, IsString } from 'class-validator';
import Decimal from 'decimal.js';
export class CreateQuittanceTrancheDto {
  @IsInt()
  @IsNotEmpty()
  quittanceId!: number;

 
  @IsNumber()
  tauxPrime: Decimal= new Decimal(0);

  @IsNumber()
  tauxCommission: Decimal= new Decimal(0);

  @IsNumber()
  taxeSurCommission: Decimal= new Decimal(0);

  @IsNumber()
  estimationPrime: Decimal= new Decimal(0);

  @IsNumber()
  primeTranche: Decimal= new Decimal(0);
 
  @IsBoolean()
  @IsOptional()
  isAnnule?: boolean;

  @IsString()
  @IsOptional()
  quittanceTrancheIdAnnule?: number;
  
  
}
