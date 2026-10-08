import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

//import { AuthController } from './auth.controller';
//import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

//import { Utilisateur } from './entities/utilisateur.entity';
import { Role } from './entities/role.entity';
import { Utilisateur } from './entities/utilisateur.entity';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { RoleController } from './controllers/role.controller';
import { RoleService } from './services/role.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Utilisateur, Role]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRATION', '15m'),
        },
      }),
    }),
  ],
  controllers: [AuthController, RoleController],
  providers: [AuthService, RoleService, JwtStrategy],
  exports: [AuthService,RoleService, JwtModule, PassportModule],
})
export class AuthModule {}