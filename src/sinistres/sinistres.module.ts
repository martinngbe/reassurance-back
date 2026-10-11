import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SinistreStatut } from './entities/sinistre-statut.entity';
import { SinistreTypeEvaluation } from './entities/sinistre-type-evaluation.entity';
import { Sinistre } from './entities/sinistre.entity';
import { SinistreEvaluation } from './entities/sinistre-evaluation.entity';
import { SinistreQuittance } from './entities/sinistre-quittance.entity';
import { SinistreReglement } from './entities/sinistre-reglement.entity';
import { SinistreReglementDetail } from './entities/sinistre-reglement-detail.entity';

import { SinistreStatutService } from './services/sinistre-statut.service';
import { SinistreStatutController } from './controllers/sinistre-statut.controller';
import { SinistreTypeEvaluationService } from './services/sinistre-type-evaluation.service';
import { SinistreService } from './services/sinistre.service';
import { SinistreEvaluationService } from './services/sinistre-evaluation.service';
import { SinistreEvaluationController } from './controllers/sinistre-evaluation.controller';
import { SinistreReglementService } from './services/sinistre-reglement.service';
import { SinistreReglementController } from './controllers/sinistre-reglement.controller';
import { ClsModule } from 'nestjs-cls';
import { SinistreController } from './controllers/sinistre.controller';
import { SinistreReglementQuittance } from './entities/sinistre-reglement-quittance.entity';
import { SinistreReglementQuittanceCession } from './entities/sinistre-reglement-quittance-cession.entity';
import { SinistreTypeEValuationController } from './controllers/sinistre-type-evaluation.controller';
import { SinistreReglementDetailController } from './controllers/sinistre-reglement-detail.controller';
import { SinistreReglementDetailService } from './services/sinistre-reglement-detail.service';
import { SinistreQuittanceService } from './services/sinistre-quittance.service';
import { SinistreQuittanceController } from './controllers/sinistre-quittance.controller';
import { SinistreActeur } from './entities/sinistre-acteur.entity';
import { SinistreActeurController } from './controllers/sinistre-acteur.controller';
import { SinistreActeurService } from './services/sinistre-acteur.service';

/**
 * Module sinistres : statuts, types d'évaluation, déclaration,
 * évaluations et règlements exposent une route CRUD. Les tables de
 * ventilation (SinistreQuittance, *Detail, *Cession, *CessionDetail,
 * SinistreEvaluationQuittance[Cession]) sont enregistrées pour TypeORM
 * mais gérées comme sous-ressources de leur agrégat (ajouter un
 * contrôleur dédié au besoin, en suivant le même patron CrudController).
 */
@Module({
  imports: [
    ClsModule, // ⬅️ OBLIGATOIRE pour @Transactional pour que le CLS fonctionne dans ce module      
    TypeOrmModule.forFeature([
      SinistreStatut,
      SinistreTypeEvaluation,
      Sinistre,
      SinistreActeur,
      SinistreEvaluation,
      SinistreQuittance,
      SinistreReglement,
      SinistreReglementDetail,
      SinistreReglementQuittance,
      SinistreReglementQuittanceCession
    ]),
  ],
  controllers: [
    SinistreStatutController,
    SinistreTypeEValuationController,
    SinistreController,
    SinistreActeurController,
    SinistreEvaluationController,
    SinistreReglementController,
    SinistreReglementDetailController,
    SinistreQuittanceController
  ],
  providers: [
    SinistreStatutService,
    SinistreTypeEvaluationService,
    SinistreService,
    SinistreActeurService,
    SinistreEvaluationService,
    SinistreReglementService,
    SinistreReglementDetailService,
    SinistreQuittanceService
  ],
  exports: [
    SinistreStatutService,
    SinistreTypeEvaluationService,
    SinistreService,
    SinistreActeurService,
    SinistreEvaluationService,
    SinistreReglementService,
    SinistreReglementDetailService,
    SinistreQuittanceService
  ],
})
export class SinistresModule {}
