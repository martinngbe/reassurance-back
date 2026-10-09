import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Utilisateur } from '../entities/utilisateur.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectRepository(Utilisateur)
    private userRepository: Repository<Utilisateur>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    console.log("__________________________________________________")
    console.log("     JwtStrategy.validate payload:",payload)
    console.log("__________________________________________________")
    const user = await this.userRepository.findOne({
      where: { id: payload.sub, isActive: true },
      relations: ['roles'],
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}