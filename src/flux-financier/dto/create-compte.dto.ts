import { IsBoolean, IsInt, IsNumber,IsString, IsOptional } from 'class-validator';

export class CreateCompteDto {

  @IsString()
  numero!: string

  @IsInt()
  @IsOptional()
  quittancePlacementId?: number;

  @IsInt()
  CompteTypeId!: number;

  @IsInt()
  acteurId!: number;

  @IsInt()
  DeviseId!: number;

  @IsNumber()
  coursDevise: number=0;


  @IsBoolean()
  @IsOptional()
  isEnNotreFaveur?: boolean;

  @IsBoolean()
  @IsOptional()
  isAnnule?: boolean;

  @IsInt()
  @IsOptional()
  compteTratieIdAnnule?: number;

  @IsNumber()
  @IsOptional()
  solde!: number;
}
