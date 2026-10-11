import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Bordereau } from './entities/bordereau.entity';
import { CompteTraite } from './entities/compte-traite.entity';
import { CompteTraiteDetail } from './entities/compte-traite-detail.entity';
import { NoteDebitCredit } from './entities/note-debit-credit.entity';
import { Reglement } from './entities/reglement.entity';
import { ReglementDetail } from './entities/reglement-detail.entity';


import { ClsModule } from 'nestjs-cls';
import { BordereauController } from './controllers/bordereau.controller';
import { CompteTraiteController } from './controllers/compte-traite.controller';
import { NoteDebitCreditController } from './controllers/note-debit-credit.controller';
import { ReglementController } from './controllers/reglement.controller';
import { BordereauService } from './services/bordereau.service';
import { CompteTraiteService } from './services/compte-traite.service';
import { NoteDebitCreditService } from './services/note-debit-credit.service';
import { ReglementService } from './services/reglement.service';
import { ReglementDetailController } from './controllers/reglement-detail.controller';
import { ReglementDetailService } from './services/reglement-detail.service';


@Module({
  imports: [
    ClsModule, // ⬅️ OBLIGATOIRE pour @Transactional pour que le CLS fonctionne dans ce module      
    TypeOrmModule.forFeature([
      Bordereau,
      CompteTraite,
      CompteTraiteDetail,
      NoteDebitCredit,
      Reglement,
      ReglementDetail,
    ]),
  ],
  controllers: [
    BordereauController,
    CompteTraiteController,
    NoteDebitCreditController,
    ReglementController,
    ReglementDetailController
  ],
  providers: [
    BordereauService,
    CompteTraiteService,
    NoteDebitCreditService,
    ReglementService,
    ReglementDetailService
  ],
  exports: [
    BordereauService,
    CompteTraiteService,
    NoteDebitCreditService,
    ReglementService,
    ReglementDetailService
  ],
})
export class FluxFinancierModule {}
