import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Branche } from './entities/branche.entity';
import { SousBranche } from './entities/sous-branche.entity';
import { DomaineActivite } from './entities/domaine-activite.entity';
import { Campagne } from './entities/campagne.entity';
import { Mouvement } from './entities/mouvement.entity';
import { CompteType } from './entities/compte-type.entity';
import { NatureCession } from './entities/nature-cession.entity';
import { Region } from './entities/region.entity';
import { Pays } from './entities/pays.entity';

import { BrancheService } from './services/branche.service';
import { BrancheController } from './controllers/branche.controller';
import { SousBrancheService } from './services/sous-branche.service';
import { SousBrancheController } from './controllers/sous-branche.controller';
import { DomaineActiviteService } from './services/domaine-activite.service';
import { DomaineActiviteController } from './controllers/domaine-activite.controller';
import { CampagneService } from './services/campagne.service';
import { CampagneController } from './controllers/campagne.controller';
import { MouvementService } from './services/mouvement.service';
import { MouvementController } from './controllers/mouvement.controller';
import { CompteTypeService } from './services/compte-type.service';
import { CompteTypeController } from './controllers/compte-type.controller';
import { NatureCessionService } from './services/nature-cession.service';
import { NatureCessionController } from './controllers/nature-cession.controller';
import { RegionService } from './services/region.service';
import { RegionController } from './controllers/region.controller';
import { PaysService } from './services/pays.service';
import { PaysController } from './controllers/pays.controller';
import { ClsModule } from 'nestjs-cls';

/**
 * Regroupe les tables de référence communes ("Référentiel" et une partie
 * du package "Acteurs" du diagramme) : branches, campagnes, mouvements,
 * types de compte, natures de cession, régions et pays.
 */
@Module({
  imports: [
    ClsModule, // ⬅️ OBLIGATOIRE pour @Transactional pour que le CLS fonctionne dans ce module
    TypeOrmModule.forFeature([
      Branche,
      SousBranche,
      DomaineActivite,
      Campagne,
      Mouvement,
      CompteType,
      NatureCession,
      Region,
      Pays,
    ]),
  ],
  controllers: [
    BrancheController,
    SousBrancheController,
    DomaineActiviteController,
    CampagneController,
    MouvementController,
    CompteTypeController,
    NatureCessionController,
    RegionController,
    PaysController,
  ],
  providers: [
    BrancheService,
    SousBrancheService,
    DomaineActiviteService,
    CampagneService,
    MouvementService,
    CompteTypeService,
    NatureCessionService,
    RegionService,
    PaysService,
  ],
  exports: [
    BrancheService,
    SousBrancheService,
    DomaineActiviteService,
    CampagneService,
    MouvementService,
    CompteTypeService,
    NatureCessionService,
    RegionService,
    PaysService,
  ],
})
export class ReferentielModule {}
