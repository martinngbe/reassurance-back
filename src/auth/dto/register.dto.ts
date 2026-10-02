import { IsEmail, IsString, MinLength, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'Password123!' })
  @IsString()
  @MinLength(8)
  password!: string;

  @ApiProperty({ example: 'Jean' })
  @IsString()
  nom!: string;

  @ApiProperty({ example: 'Dupont' })
  @IsString()
  prenoms!: string;

  @ApiProperty({ required: false, example: ['GESTIONNAIRE'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  roles?: string[];
}