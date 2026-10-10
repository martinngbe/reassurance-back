import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateUtilisateurDto {
  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  nom!: string;

  @IsString()
  @IsNotEmpty()
  prenoms!: string;
 
  @IsBoolean()
  isActive: boolean = true;
}