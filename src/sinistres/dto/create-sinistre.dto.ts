import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateSinistreDto {
  @IsInt()
  sinistreStatutId!: number;

  @IsString()
  @IsNotEmpty()
  numero!: string;
}
