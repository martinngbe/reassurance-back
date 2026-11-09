import { IsBoolean, IsInt,IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateCompteTypeDto {
  @IsString()
  code! : string
  @IsString()
  libelle!: string
}
