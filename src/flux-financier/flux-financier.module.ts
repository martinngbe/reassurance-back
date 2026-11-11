import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Bordereau } from './entities/bordereau.entity';
import { Compte } from './entities/compte.entity';
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
import { CompteRubriqueController } from './controllers/compte-rubrique.controller';
import { CompteDetailController } from './controllers/compte-detail.controller';
import { CompteDetailService } from './services/compte-detail.service';
import { CompteRubriqueService } from './services/compte-rubrique.service';
import { CompteDetail } from './entities/compte-detail.entity';
import { TempCompte } from './entities/temp-compte.entity';
import { TempCompteDetail } from './entities/temp-compte-detail.entity';
import { TempCompteController } from './controllers/temp-compte.controller';
import { TempCompteDetailController } from './controllers/temp-compte-detail.controller';
import { TempCompteService } from './services/temp-compte.service';
import { TempCompteDetailService } from './services/temp-compte-detail.service';
import { CompteTypeController } from './controllers/compte-type.controller';
import { CompteTypeService } from './services/compte-type.service';
import { CompteRubrique } from './entities/compte-rubrique.entity';
import { CompteType } from './entities/compte-type.entity';
import { SeriesModule } from 'src/series/series.module';


@Module({
  imports: [
    ClsModule, // ⬅️ OBLIGATOIRE pour @Transactional pour que le CLS fonctionne dans ce module      
    SeriesModule,
    TypeOrmModule.forFeature([
      Bordereau,
      Compte,
      CompteType,
      CompteDetail,
      TempCompte,
      TempCompteDetail,
      CompteRubrique,
      NoteDebitCredit,
      Reglement,
      ReglementDetail,
    ]),
  ],
  controllers: [
    BordereauController,
    CompteController,
    CompteTypeController,
    CompteDetailController,
    TempCompteController,
    TempCompteDetailController,
    CompteRubriqueController,
    NoteDebitCreditController,
    ReglementController,
    ReglementDetailController
  ],
  providers: [
    BordereauService,
    CompteService,
    CompteTypeService,
    CompteDetailService,
    TempCompteService,
    TempCompteDetailService,
    CompteRubriqueService,
    NoteDebitCreditService,
    ReglementService,
    ReglementDetailService
  ],
  exports: [
    BordereauService,
    CompteService,
     CompteTypeService,
    CompteDetailService,
    TempCompteService,
    TempCompteDetailService,
    CompteRubriqueService,    
    NoteDebitCreditService,
    ReglementService,
    ReglementDetailService
  ],
})
export class FluxFinancierModule {}
