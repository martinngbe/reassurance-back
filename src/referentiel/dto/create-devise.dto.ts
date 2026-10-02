import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateDeviseDto {
  
  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsString()
  @IsNotEmpty()
  libelle!: string;

}
