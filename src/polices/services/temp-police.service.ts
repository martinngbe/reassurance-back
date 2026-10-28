import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CrudService } from '../../common/crud/crud.service';
import { TempPolice } from '../entities/temp-police.entity';
import { LogMethod } from 'src/common/decorateur/log-method.decorator';
import { Transactional, TransactionHost } from '@nestjs-cls/transactional';
import { failure } from 'src/common/helper/response.helper';
import { Quittance } from 'src/quittances/entities/quittance.entity';
import { TempQuittance } from 'src/quittances/entities/temp-quittance.entity';
import { Police } from '../entities/police.entity';
import { TransactionalAdapterTypeOrm } from '@nestjs-cls/transactional-adapter-typeorm';

// Champs copiés TempQuittance -> Quittance (jamais id / policeId)
const CHAMPS_QUITTANCE = [
  'numero',
  'mouvementId',
  'deviseId',
  'coursDevise',
  'dateEmission',
  'dateEffet',
  'dateEcheance',
  'avisEcheance',
  'capitaux',
  'lci',
  'smp',
  'limite',
  'retention',
  'conservation',
  'capacite',
  'nombrePlein',
  'estimationPrime',
  'tauxCedante',
  'tauxAccepte',
  'tauxCommission',
  'taxeSurCommission',
  'primeBrute',
  'primeNette',
  'taxeSurPrime',
  'nombreEcheancePmd',
  'sinistreAuComptant',
  'avisSinistre',
  'aliment',
] as const;


@Injectable()
export class TempPoliceService extends CrudService<TempPolice> {
  constructor(
    @InjectRepository(TempPolice) tempPolicerepository: Repository<TempPolice>,
   private readonly txHost: TransactionHost<TransactionalAdapterTypeOrm>,
  ) {
    super(tempPolicerepository);
  }


    /**
     * Crée une nouvelle entité.
     */
     @LogMethod()
    async create(dto: DeepPartial<TempPolice>): Promise<TempPolice> {
     
      const entity = this.repository.create(dto);
      return this.repository.save(entity);
    }


     /**
   * Transfère une TempPolice et ses TempQuittance vers Police / Quittance,
   * en conservant le lien père/fils, puis purge les données temporaires.
   * Tout ou rien : une erreur annule l'ensemble.
   */
  @Transactional()
  async transfererDepuisTemp(tempPoliceId: number): Promise<Police> {
    const tx = this.txHost.tx; // EntityManager de la transaction en cours

    // 1. Police temporaire (relations eager désactivées : on ne veut que les colonnes)
    const tp = await tx.getRepository(TempPolice).findOne({
      where: { id: tempPoliceId },
      loadEagerRelations: false,
    });
    if (!tp) {
      throw new NotFoundException( failure(`TempPolice ${tempPoliceId} introuvable`));
    }
    // Police.assureId est NOT NULL, TempPolice.assureId est nullable
   /* if (!tp.assureId) {
      throw new BadRequestException(
        failure(`La police temporaire ${tempPoliceId} n'a pas d'assuré`),
      );
    }
    */

    // 2. TempPolice -> Police
    const policeRepo = tx.getRepository(Police);
    const police = await policeRepo.save(
      policeRepo.create({
        numero: tp.numero,
        isReconductionTacite: tp.isReconductionTacite,
        isIard: tp.isIard,
        isCession: tp.isCession,
        natureOffreId: tp.natureOffreId,
        sousBrancheId: tp.sousBrancheId,
        acteurCedanteId: tp.acteurCedanteId,
        acteurCourtierId: tp.acteurCourtierId,
        assureId: tp.assureId,
        
      }),
    );

    // 3. TempQuittance -> Quittance, rattachées au NOUVEL id de police
    const tempQuittances = await tx.getRepository(TempQuittance).find({
      where: { policeId: tp.id },
      loadEagerRelations: false,
      order: { id: 'ASC' },
    });

    const quittanceRepo = tx.getRepository(Quittance);
    for (const tq of tempQuittances) {
      const data: Record<string, unknown> = {};
      for (const champ of CHAMPS_QUITTANCE) data[champ] = tq[champ];

      await quittanceRepo.save(
        quittanceRepo.create({
          ...data,
          policeId: police.id, // lien père/fils
         // isAnnule: false,
        }),
      );

      // 3 bis. Objets assurés : à compléter avec TempObjetAssure / ObjetAssure
      // (nouvel id de quittance comme clé). À supprimer AVANT les
      // TempQuittance à l'étape 4 (delete() ne déclenche pas le cascade).
    }

    // 4. Purge des données temporaires (enfants avant parent)
    if (tempQuittances.length) {
      await tx
        .getRepository(TempQuittance)
        .delete(tempQuittances.map((q) => q.id));
    }
    await tx.getRepository(TempPolice).delete(tp.id);

    // 5. Retour de la police définitive avec ses quittances
    return tx.getRepository(Police).findOneOrFail({
      where: { id: police.id },
      relations: { quittances: true },
      loadEagerRelations: false,
    });
  }
}
