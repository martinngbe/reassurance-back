import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Quittance } from './entities/quittance.entity';
import { QuittancePlacement } from './entities/quittance-placement.entity';
import { ObjetAssure } from './entities/objet-assure.entity';

import { QuittanceService } from './services/quittance.service';
import { QuittanceController } from './controllers/quittance.controller';
import { EcheancePmdService } from '../flux-financier/services/echeance-pmd.service';
import { EcheancePmdController } from '../flux-financier/controllers/echeance-pmd.controller';
import { ClsModule } from 'nestjs-cls';
import { FluxFinancierModule } from 'src/flux-financier/flux-financier.module';
import { EcheancePmd } from 'src/flux-financier/entities/echeance-pmd.entity';
import { TempQuittance } from './entities/temp-quittance.entity';
import { TempQuittanceController } from './controllers/temp-quittance.controller';
import { TempQuittanceService } from './services/temp-quittance.service';
import { TempObjetAssure } from './entities/temp-objet-assure.entity';
import { TempObjetAssureController } from './controllers/temp-objet-assure.controller';
import { TempObjetAssureService } from './services/temp-objet-assure.service';
import { QuittanceCalculService } from './services/quittance-calcul.service';
import { QuittancePlacementController } from './controllers/quittance-placement.controller';
import { QuittancePlacementService } from './services/quittance-placement.service';
import { QuittancePlacementCalculService } from './services/quittance-placement-calcul.service';
import { SeriesModule } from 'src/series/series.module';
import { QuittanceTranche } from './entities/quittance-tranche.entity';
import { QuittanceTrancheController } from './controllers/quittance-tranche.controller';
import { QuittanceTrancheService } from './services/quittance-tranche.service';

/**
 * Cœur métier "Affaires" : quittances d'acceptation, leurs rétrocessions
 * (QuittancePlacement), les objets assurés et les échéances PMD.
 * ObjetAssure n'a pas de route dédiée : il est géré comme sous-ressource
 * de la quittance (ajouter un ObjetAssureController si besoin d'un accès
 * direct, en suivant le même patron CrudController).
 */
@Module({
  imports: [
    ClsModule, // ⬅️ OBLIGATOIRE pour @Transactional pour que le CLS fonctionne dans ce module    
    FluxFinancierModule,
     SeriesModule,
    TypeOrmModule.forFeature([
      Quittance, 
      QuittancePlacement, 
      QuittanceTranche,
      ObjetAssure,      
      EcheancePmd,
      TempQuittance,
      TempObjetAssure
    ]),
  ],
  controllers: [
    QuittanceController, 
    QuittancePlacementController,
    QuittanceTrancheController, 
    EcheancePmdController,
    TempQuittanceController,
    TempObjetAssureController
    
  ],
  providers: [
    QuittanceService, 
    QuittancePlacementService,
    QuittanceTrancheService, 
    QuittanceCalculService,
    QuittancePlacementService,
    QuittancePlacementCalculService ,
    EcheancePmdService,
    TempQuittanceService,
    TempObjetAssureService
  ],
  exports: [
    QuittanceService, 
    QuittancePlacementService,
    QuittanceCalculService,
    QuittancePlacementService ,
    QuittancePlacementCalculService ,
    EcheancePmdService,
    TempQuittanceService,
    TempObjetAssureService
  ],
})
export class QuittancesModule {}
