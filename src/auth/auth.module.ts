import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Role } from './entities/role.entity';
import { Utilisateur } from './entities/utilisateur.entity';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { RoleController } from './controllers/role.controller';
import { RoleService } from './services/role.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';

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
  providers: [AuthService, RoleService, JwtStrategy,
     // ⬇️ Enregistrez le guard globalement ici
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },],
  exports: [AuthService,RoleService, JwtModule, PassportModule],
})
export class AuthModule {}