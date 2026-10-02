import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSinistreTypeEvaluationDto {
  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsString()
  @IsNotEmpty()
  libelle!: string;
}
