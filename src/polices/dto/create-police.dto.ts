import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePoliceDto {
  @IsString()
  @IsNotEmpty()
  numero: string;

  @IsBoolean()
  @IsOptional()
  isCession?: boolean;

  @IsBoolean()
  @IsOptional()
  isReconductionTacite?: boolean;

  @IsInt()
  idSousBranche: number;

  @IsInt()
  idActeurCedante: number;

  @IsInt()
  @IsOptional()
  idActeurCourtier?: number;

  @IsInt()
  idAssure: number;
}
