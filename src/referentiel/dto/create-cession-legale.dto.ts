import { IsInt,IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import Decimal from 'decimal.js';

export class CreateCessionLegaleDto {
  @IsString()
  @IsNotEmpty()
  taux: Decimal=new Decimal(0);

  @IsBoolean()
  isFac!: boolean;

  @IsInt()
  @IsNotEmpty()
  acteurId!: number;
}
