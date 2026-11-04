import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNaturePlacementDto {
  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsString()
  @IsNotEmpty()
  libelle!: string;
}
