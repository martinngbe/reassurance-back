import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePoliceDto {
  @IsString()
  @IsOptional()
  numero!: string;

  @IsBoolean()
  @IsOptional()
  isCession?: boolean;

  @IsBoolean()
  @IsOptional()
  isReconductionTacite?: boolean;

  @IsBoolean()
  @IsOptional()
  isIard?: boolean // IARD | VIE 
  
  @IsBoolean()
  @IsOptional()
  isFacPure?: boolean // FAC PURE | FAC XLS 


  @IsInt()
  @IsNotEmpty()
  sousBrancheId!: number;

  @IsInt()
  acteurCedanteId!: number;

  @IsInt()
  @IsOptional()
  acteurCourtierId?: number;

  @IsInt()
  @IsOptional()
  assureId!: number;
}
