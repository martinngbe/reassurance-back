import { IsBoolean, IsInt, IsNumber, IsNotEmpty,IsOptional, IsString } from 'class-validator';

export class CreateQuittanceCessionDto {
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
  taux: number=0;

  @IsBoolean()
  @IsOptional()
  isCession?: boolean;

  @IsBoolean()
  @IsOptional()
  isProportionnel?: boolean;

  @IsBoolean()
  @IsOptional()
  isFac?: boolean;

  @IsBoolean()
  @IsOptional()
  isAnnule?: boolean;

  @IsString()
  @IsOptional()
  quittanceCessionIdAnnule?: string;
}
