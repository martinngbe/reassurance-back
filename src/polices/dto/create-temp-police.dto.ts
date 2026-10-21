import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTempPoliceDto {
  @IsString()
  @IsOptional()
  numero!: string;

  @IsBoolean()
  @IsOptional()
  isCession?: boolean;

  @IsBoolean()
  @IsOptional()
  isReconductionTacite?: boolean;

  @IsInt()
  @IsNotEmpty()
  idSousBranche!: number;

  @IsInt()
  acteurCedanteId!: number;

  @IsInt()
  @IsOptional()
  acteurCourtierId?: number;

  @IsInt()
  @IsOptional()
  assureId!: number;
}
