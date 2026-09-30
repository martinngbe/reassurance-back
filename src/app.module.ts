import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeOrmConfig } from './config/typeorm.config';

import { ReferentielModule } from './referentiel/referentiel.module';
import { ActeursModule } from './acteurs/acteurs.module';
import { PolicesModule } from './polices/polices.module';
import { QuittancesModule } from './quittances/quittances.module';
import { SinistresModule } from './sinistres/sinistres.module';
import { ClsModule } from 'nestjs-cls';
import { ClsPluginTransactional } from '@nestjs-cls/transactional';
import { TransactionalAdapterTypeOrm } from '@nestjs-cls/transactional-adapter-typeorm';
import { DataSource } from 'typeorm';
import { FluxFinancierModule } from './flux-financier/services/flux-financier.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),

    ReferentielModule,
    ActeursModule,
    PolicesModule,   // ⬇️ AJOUTER CE BLOC
    ClsModule.forRoot({
      plugins: [
        new ClsPluginTransactional({
          adapter: new TransactionalAdapterTypeOrm({
            dataSourceToken: DataSource, // Token d'injection de la DataSource
          }),
        }),
      ],
    }),
    QuittancesModule,
    FluxFinancierModule,
    SinistresModule,
  ],
})
export class AppModule {}
