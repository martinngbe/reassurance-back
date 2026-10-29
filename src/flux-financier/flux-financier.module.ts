import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Bordereau } from './entities/bordereau.entity';
import { Compte } from './entities/compte.entity';
import { CompteDetail } from './entities/compte-detail.entity';
import { NoteDebitCredit } from './entities/note-debit-credit.entity';
import { Reglement } from './entities/reglement.entity';
import { ReglementDetail } from './entities/reglement-detail.entity';


import { ClsModule } from 'nestjs-cls';
import { BordereauController } from './controllers/bordereau.controller';
import { CompteController } from './controllers/compte.controller';
import { NoteDebitCreditController } from './controllers/note-debit-credit.controller';
import { ReglementController } from './controllers/reglement.controller';
import { BordereauService } from './services/bordereau.service';
import { CompteService } from './services/compte.service';
import { NoteDebitCreditService } from './services/note-debit-credit.service';
import { ReglementService } from './services/reglement.service';
import { ReglementDetailController } from './controllers/reglement-detail.controller';
import { ReglementDetailService } from './services/reglement-detail.service';
import { CompteRubrique } from './entities/compte-rubrique.entity';
import { CompteRubriqueController } from './controllers/compte-rubrique.controller';
import { CompteDetailController } from './controllers/compte-detail.controller';
import { CompteDetailService } from './services/compte-detail.service';
import { CompteRubriqueService } from './services/compte-rubrique.service';


@Module({
  imports: [
    ClsModule, // ⬅️ OBLIGATOIRE pour @Transactional pour que le CLS fonctionne dans ce module      
    TypeOrmModule.forFeature([
      Bordereau,
      Compte,
      CompteDetail,
      CompteRubrique,
      NoteDebitCredit,
      Reglement,
      ReglementDetail,
    ]),
  ],
  controllers: [
    BordereauController,
    CompteController,
    CompteDetailController,
    CompteRubriqueController,
    NoteDebitCreditController,
    ReglementController,
    ReglementDetailController
  ],
  providers: [
    BordereauService,
    CompteService,
    CompteDetailService,
    CompteRubriqueService,
    NoteDebitCreditService,
    ReglementService,
    ReglementDetailService
  ],
  exports: [
    BordereauService,
    CompteService,
    CompteDetailService,
    CompteRubriqueService,    
    NoteDebitCreditService,
    ReglementService,
    ReglementDetailService
  ],
})
export class FluxFinancierModule {}
