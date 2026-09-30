import { IsOptional, IsString } from 'class-validator';

export class CreateSinistreDto {
  @IsString()
  @IsOptional()
  reference?: string;
}
