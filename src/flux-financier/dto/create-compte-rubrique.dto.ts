import { IsBoolean, IsInt,IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCompteRubriqueDto {
   @IsInt()
   @IsOptional()
   numeroOrdre!: number;
 
   @IsString()
   @IsNotEmpty()
   code!: string;
 
   @IsString()
   @IsNotEmpty()
   libelle!: string;
 
   @IsString()
   @IsNotEmpty()
   partie!: string;
 
   @IsBoolean()
   @IsOptional()
   isProportionnelle!: boolean;
 
   @IsBoolean()
   @IsOptional()
   isNonProportionnelle!: boolean;
}
