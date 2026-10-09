import { ApiProperty } from '@nestjs/swagger';
import { Utilisateur } from '../entities/utilisateur.entity';

export class AuthResponseDto {
  @ApiProperty()
  accessToken!: string;

  @ApiProperty()
  refreshToken!: string;

  @ApiProperty()
  expiresIn!: number;

  @ApiProperty()
  utilisateurId!: number;
}