import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateSinistreReglementDto {
  @IsInt()
  @IsNotEmpty()
  sinistreId!: number;

  @IsInt()
  @IsNotEmpty() 
  acteurCedanteId!: number;

  @IsInt()
  @IsOptional()
  acteurCourtierId?: number;

  @IsInt()
  @IsNotEmpty()
  deviseId!: number;

  @IsNumber()
  coursDevise: number=0;

  @IsNumber()
  montant: number=0;

  @IsBoolean()
  @IsOptional()
  isAnnule?: boolean;

  @IsInt()
  @IsOptional()
  sinistreReglementIdAnnule?: number;
}
