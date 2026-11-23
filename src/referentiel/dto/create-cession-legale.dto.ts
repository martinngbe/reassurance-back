import { IsInt,IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import Decimal from 'decimal.js';

export class CreateCessionLegaleDto {
  
  @IsNumber()
  taux: Decimal=new Decimal(0);

  @IsBoolean()
  isFac!: boolean;

  @IsInt()
  @IsNotEmpty()
  acteurId!: number;
}
