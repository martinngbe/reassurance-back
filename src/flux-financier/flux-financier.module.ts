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

/**
 * Flux financiers : bordereaux, comptes traités (+ détail), notes de
 * débit/crédit et règlements (+ détail). CompteTraiteDetail et
 * ReglementDetail sont enregistrés comme sous-ressources (pas de route
 * REST dédiée) : ils sont créés/consultés via leur agrégat parent.
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClsModule, // ⬅️ OBLIGATOIRE pour @Transactional pour que le CLS fonctionne dans ce module
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
  ],
  providers: [
    BordereauService,
    CompteTraiteService,
    NoteDebitCreditService,
    ReglementService,
  ],
  exports: [
    BordereauService,
    CompteTraiteService,
    NoteDebitCreditService,
    ReglementService,
  ],
})
export class FluxFinancierModule {}
