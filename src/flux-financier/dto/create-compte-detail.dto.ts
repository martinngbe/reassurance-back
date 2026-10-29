import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateCompteDetailDto {
  @IsInt()
  @IsNotEmpty()
  compteId?: number;

  @IsInt()
  @IsNotEmpty()
  compteRubriqueId!: number;

 
  @IsInt()
  DeviseId!: number;

  @IsNumber()
  coursDevise: number=0;

  @IsNumber()
  @IsOptional()
  debit?: number;

  @IsNumber()
  @IsOptional()
  credit?: number;

  @IsBoolean()
  @IsOptional()
  isAnnule?: boolean;

  @IsInt()
  @IsOptional()
  compteTratieDetailIdAnnule?: number;


}
