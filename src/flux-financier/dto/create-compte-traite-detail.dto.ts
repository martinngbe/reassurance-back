import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateCompteTraiteDetailDto {
  @IsInt()
  @IsNotEmpty()
  compteTraiteId?: number;

  @IsInt()
  @IsNotEmpty()
  compteTraiteRubriqueId!: number;

 
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
