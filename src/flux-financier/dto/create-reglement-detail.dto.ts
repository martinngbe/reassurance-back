import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateReglementDetailDto {
  @IsInt()
  @IsNotEmpty()
  reglementId!: number;

  @IsInt()
  @IsNotEmpty()
  noteDebitCreditId!: number;
  
  
  @IsInt()
  @IsNotEmpty()
  deviseId!: number;
 
  @IsInt()
  @IsNotEmpty()coursDevise: number = 0;
 
   

  @IsNumber()
  montant: number=0;

  @IsBoolean()
  @IsOptional()
  isAnnule?: boolean;

  @IsInt()
  @IsOptional()
  reglementDetailIdAnnule?: number;

 
}
