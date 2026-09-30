import { IsBoolean, IsInt, IsNumber, IsOptional } from 'class-validator';

export class CreateSinistreReglementDto {
  @IsInt()
  sinistreId: number;

  @IsInt()
  idActeurCedante: number;

  @IsInt()
  @IsOptional()
  idActeurCourtier?: number;

  @IsInt()
  deviseId: number;

  @IsNumber()
  coursDevise: number;

  @IsNumber()
  montant: number;

  @IsBoolean()
  @IsOptional()
  isAnnule?: boolean;

  @IsInt()
  @IsOptional()
  idSinistreReglementAnnule?: number;
}
