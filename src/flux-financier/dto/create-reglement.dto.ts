import { IsBoolean, IsInt, IsNumber, IsOptional } from 'class-validator';

export class CreateReglementDto {
  @IsInt()
  acteurId!: number;

  @IsBoolean()
  @IsOptional()
  isCourtier?: boolean;

  @IsNumber()
  montant: number=0;

  @IsBoolean()
  @IsOptional()
  isAnnule?: boolean;

  @IsInt()
  @IsOptional()
  reglementIdAnnule?: number;
}
