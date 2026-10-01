import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SinistreStatut } from './entities/sinistre-statut.entity';
import { SinistreTypeEvaluation } from './entities/sinistre-type-evaluation.entity';
import { Sinistre } from './entities/sinistre.entity';
import { SinistreDeclaration } from './entities/sinistre-declaration.entity';
import { SinistreEvaluation } from './entities/sinistre-evaluation.entity';
import { SinistreQuittance } from './entities/sinistre-quittance.entity';
import { SinistreReglement } from './entities/sinistre-reglement.entity';
import { SinistreReglementDetail } from './entities/sinistre-reglement-detail.entity';
import { SinistreReglementCession } from './entities/sinistre-reglement-cession.entity';
import { SinistreReglementCessionDetail } from './entities/sinistre-reglement-cession-detail.entity';
import { SinistreEvaluationQuittance } from './entities/sinistre-evaluation-quittance.entity';
import { SinistreEvaluationQuittanceCession } from './entities/sinistre-evaluation-quittance-cession.entity';

import { SinistreStatutService } from './services/sinistre-statut.service';
import { SinistreStatutController } from './controllers/sinistre-statut.controller';
import { SinistreTypeEvaluationService } from './services/sinistre-type-evaluation.service';
import { SinistreTypeEvaluationController } from './controllers/sinistre-type-evaluation.controller';
import { SinistreService } from './services/sinistre.service';
import { SinistreController } from './controllers/sinistre.controller';
import { SinistreDeclarationService } from './services/sinistre-declaration.service';
import { SinistreDeclarationController } from './controllers/sinistre-declaration.controller';
import { SinistreEvaluationService } from './services/sinistre-evaluation.service';
import { SinistreEvaluationController } from './controllers/sinistre-evaluation.controller';
import { SinistreReglementService } from './services/sinistre-reglement.service';
import { SinistreReglementController } from './controllers/sinistre-reglement.controller';
import { ClsModule } from 'nestjs-cls';

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
      SinistreDeclaration,
      SinistreEvaluation,
      SinistreQuittance,
      SinistreReglement,
      SinistreReglementDetail,
      SinistreReglementCession,
      SinistreReglementCessionDetail,
      SinistreEvaluationQuittance,
      SinistreEvaluationQuittanceCession,
    ]),
  ],
  controllers: [
    SinistreStatutController,
    SinistreTypeEvaluationController,
    SinistreController,
    SinistreDeclarationController,
    SinistreEvaluationController,
    SinistreReglementController,
  ],
  providers: [
    SinistreStatutService,
    SinistreTypeEvaluationService,
    SinistreService,
    SinistreDeclarationService,
    SinistreEvaluationService,
    SinistreReglementService,
  ],
  exports: [
    SinistreStatutService,
    SinistreTypeEvaluationService,
    SinistreService,
    SinistreDeclarationService,
    SinistreEvaluationService,
    SinistreReglementService,
  ],
})
export class SinistresModule {}
