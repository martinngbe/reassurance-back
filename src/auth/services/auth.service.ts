import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { Utilisateur } from '../entities/utilisateur.entity';
import { Role } from '../entities/role.entity';
import { RegisterDto } from '../dto/register.dto';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { LoginDto } from '../dto/login.dto';

// import { Utilisateur } from './entities/utilisateur.entity';
// import { Role } from './entities/role.entity';
// import { RegisterDto } from './dto/register.dto';
// import { LoginDto } from './dto/login.dto';
// import { AuthResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Utilisateur)
    private utilisateurRepository: Repository<Utilisateur>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // =========================================================================
  // INSCRIPTION
  // =========================================================================
  async register(dto: RegisterDto): Promise<AuthResponseDto> {
    const existingUser = await this.utilisateurRepository.findOne({
      where: { email: dto.email },
    });
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    // Récupérer les rôles demandés
    const roles = dto.roles?.length
      ? await this.roleRepository.findBy({ code: { $in: dto.roles } as any })
      : await this.roleRepository.findBy({ code: 'CONSULTANT' as any });

    if (!roles.length) {
      throw new BadRequestException('Invalid roles');
    }

    const utilisateur = this.utilisateurRepository.create({
      email: dto.email,
      password: dto.password,
      nom: dto.nom,
      prenoms: dto.prenoms,
      roles,
    });

    const savedUser = await this.utilisateurRepository.save(utilisateur);
    return this.generateTokens(savedUser);
  }

  // =========================================================================
  // CONNEXION
  // =========================================================================
  async login(dto: LoginDto): Promise<AuthResponseDto> {
    const utilisateur = await this.utilisateurRepository.findOne({
      where: { email: dto.email },
      relations: ['roles'],
    });

    if (!utilisateur) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!utilisateur.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    if (utilisateur.lockedUntil && utilisateur.lockedUntil > new Date()) {
      throw new UnauthorizedException(
        `Account locked until ${utilisateur.lockedUntil.toISOString()}`,
      );
    }

    const isPasswordValid = await utilisateur.comparePassword(dto.password);
    if (!isPasswordValid) {
      utilisateur.loginAttempts += 1;

      if (utilisateur.loginAttempts >= 5) {
        utilisateur.lockedUntil = new Date(Date.now() + 30 * 60 * 1000);
        utilisateur.loginAttempts = 0;
      }

      await this.utilisateurRepository.save(utilisateur);
      throw new UnauthorizedException('Invalid credentials');
    }

    utilisateur.loginAttempts = 0;
    utilisateur.lockedUntil = null;
    utilisateur.lastLoginAt = new Date();
    await this.utilisateurRepository.save(utilisateur);

    return this.generateTokens(utilisateur);
  }

  // =========================================================================
  // REFRESH TOKEN
  // =========================================================================
  async refreshToken(refreshToken: string): Promise<AuthResponseDto> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      const utilisateur = await this.utilisateurRepository.findOne({
        where: { id: payload.sub },
        relations: ['roles'],
      });

      if (!utilisateur || utilisateur.refreshToken !== refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      return this.generateTokens(utilisateur);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  // =========================================================================
  // DÉCONNEXION
  // =========================================================================
  async logout(userId: number): Promise<void> {
    await this.utilisateurRepository.update(userId, { refreshToken: undefined });
  }

  // =========================================================================
  // PROFIL
  // =========================================================================
  async getProfile(userId: number): Promise<Utilisateur> {
    const utilisateur = await this.utilisateurRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });

    if (!utilisateur) {
      throw new NotFoundException('Utilisateur not found');
    }

    return utilisateur;
  }

  // =========================================================================
  // HELPERS
  // =========================================================================
  private async generateTokens(utilisateur: Utilisateur): Promise<AuthResponseDto> {
    const payload = {
      sub: utilisateur.id,
      email: utilisateur.email,
      roles: utilisateur.roles?.map((r) => r.code) || [],
    };
    //console.log("__________________________________________")
    //console.log("       AuthService.generateTokens")
    //console.log("__________________________________________")
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_EXPIRATION', '15m'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION', '7d'),
      }),
    ]);
    //console.log("accessToken, refreshToken", accessToken, refreshToken)

    utilisateur.refreshToken = await bcrypt.hash(refreshToken, 10);
    await this.utilisateurRepository.save(utilisateur);
    const expiresIn = parseInt(this.configService.get('JWT_EXPIRATION', '15m'))
    //console.log("expiresIn", expiresIn)
    //console.log("__________________________________________")
    return {
      accessToken,
      refreshToken,
      expiresIn,
      utilisateurId : utilisateur.id,
    };
  }
}