import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSinistreActeurDto {
  @IsInt()
  @IsNotEmpty()
  sinistreId!: number;

  @IsString()
  numeroReference!: string;
 
  @IsInt()
  @IsNotEmpty()
  acteurId!: number;

}
