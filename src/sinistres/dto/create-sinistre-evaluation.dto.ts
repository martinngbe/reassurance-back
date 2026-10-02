import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSinistreEvaluationDto {
  @IsInt()
  @IsNotEmpty()
  sinistreId!: number;

  @IsInt()
  @IsNotEmpty()
  sinistreTypeEvaluationId!: number;

  @IsInt()
  @IsNotEmpty()
  deviseId!: number;

  @IsNumber()
  coursDevise: number=0;

  @IsNumber()
  montant: number=0;
}
