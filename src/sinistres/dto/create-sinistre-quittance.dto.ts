import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSinistreQuittanceDto {
  @IsInt()
  @IsNotEmpty()
  sinistreId!: number;

 
  @IsInt()
  @IsNotEmpty()
  quittanceId!: number;

}
