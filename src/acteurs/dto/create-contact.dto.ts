import { IsEmail, IsInt, IsNotEmpty, IsOptional,IsString } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  nom!: string;

  @IsString()
  @IsNotEmpty()
  prenoms!: string;

  @IsEmail()
  @IsOptional()
  email!: string;

  @IsString()
  @IsOptional()
  telephone!: string;

  @IsInt()
  @IsNotEmpty()
  acteurId!: number;
}

