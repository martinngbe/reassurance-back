import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Quittance } from './entities/quittance.entity';
import { QuittanceCession } from './entities/quittance-cession.entity';
import { ObjetAssure } from './entities/objet-assure.entity';
import { EcheancePmd } from './entities/echeance-pmd.entity';

import { QuittanceService } from './services/quittance.service';
import { QuittanceController } from './controllers/quittance.controller';
import { QuittanceCessionService } from './services/quittance-cession.service';
import { QuittanceCessionController } from './controllers/quittance-cession.controller';
import { EcheancePmdService } from './services/echeance-pmd.service';
import { EcheancePmdController } from './controllers/echeance-pmd.controller';
import { QuittanceAnnulationService } from './services/quittance-annulation.service';
import { ClsModule } from 'nestjs-cls';

/**
 * Cœur métier "Affaires" : quittances d'acceptation, leurs rétrocessions
 * (QuittanceCession), les objets assurés et les échéances PMD.
 * ObjetAssure n'a pas de route dédiée : il est géré comme sous-ressource
 * de la quittance (ajouter un ObjetAssureController si besoin d'un accès
 * direct, en suivant le même patron CrudController).
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClsModule, // ⬅️ OBLIGATOIRE pour @Transactional pour que le CLS fonctionne dans ce module
      Quittance, 
      QuittanceCession, ObjetAssure, EcheancePmd]),
  ],
  controllers: [QuittanceController, QuittanceCessionController, EcheancePmdController],
  providers: [QuittanceService,QuittanceAnnulationService, QuittanceCessionService, EcheancePmdService],
  exports: [QuittanceService, QuittanceCessionService, EcheancePmdService],
})
export class QuittancesModule {}
