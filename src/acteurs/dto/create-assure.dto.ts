import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAssureDto {
  @IsString()
  @IsNotEmpty()
  sigle: string;

  @IsString()
  @IsNotEmpty()
  raisonSociale: string;

  @IsEmail()
  email: string;
}
