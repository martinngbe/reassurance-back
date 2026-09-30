import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsString()
  @IsNotEmpty()
  prenoms: string;

  @IsEmail()
  eMail: string;

  @IsString()
  @IsNotEmpty()
  numeroTelephone: string;

  @IsInt()
  acteurId: number;
}
