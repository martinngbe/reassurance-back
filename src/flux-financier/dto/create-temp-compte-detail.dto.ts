import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import Decimal from 'decimal.js';

export class CreateTempCompteDetailDto {
  @IsInt()
  @IsNotEmpty()
  compteId?: number;

  @IsInt()
  @IsNotEmpty()
  compteRubriqueId!: number;

 
  @IsInt()
  deviseId!: number;

  @IsNumber()
  coursDevise: Decimal=new Decimal(0);

  @IsNumber()
  @IsOptional()
  debit?: Decimal=new Decimal(0);

  @IsNumber()
  @IsOptional()
  credit?: Decimal=new Decimal(0);

  @IsBoolean()
  @IsOptional()
  isAnnule?: boolean;

  @IsInt()
  @IsOptional()
  compteDetailIdAnnule?: number | null;


}
