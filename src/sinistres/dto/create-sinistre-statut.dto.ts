import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSinistreStatutDto {
  @IsString()
  @IsNotEmpty()
  libelle!: string;
}
