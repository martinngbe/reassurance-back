import { IsInt, IsNumber } from 'class-validator';

export class CreateSinistreEvaluationDto {
  @IsInt()
  sinistreId: number;

  @IsInt()
  sinistreTypeEvaluationId: number;

  @IsInt()
  deviseId: number;

  @IsNumber()
  coursDevise: number;

  @IsNumber()
  montant: number;
}
