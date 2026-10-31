import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDeviseDto {
  
  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsString()
  @IsNotEmpty()
  libelle!: string;


  @IsString()
  @IsOptional()
  cours!: number;

  @IsBoolean()
  @IsOptional()
  isLocale?: boolean
  


}
