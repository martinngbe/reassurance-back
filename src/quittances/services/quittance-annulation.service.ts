import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, QueryRunner } from 'typeorm';
import { Quittance } from '../entities/quittance.entity';
import { QuittanceCession } from '../entities/quittance-cession.entity';
import { Bordereau } from 'src/flux-financier/entities/bordereau.entity';
import { EcheancePmd } from '../entities/echeance-pmd.entity';
import { NoteDebitCredit } from 'src/flux-financier/entities/note-debit-credit.entity';
import { Reglement } from 'src/flux-financier/entities/reglement.entity';
import { ReglementDetail } from 'src/flux-financier/entities/reglement-detail.entity';
import { SinistreQuittance } from 'src/sinistres/entities/sinistre-quittance.entity';
import { SinistreEvaluationQuittance } from 'src/sinistres/entities/sinistre-evaluation-quittance.entity';
import { SinistreEvaluationQuittanceCession } from 'src/sinistres/entities/sinistre-evaluation-quittance-cession.entity';
import { CompteTraite } from 'src/flux-financier/entities/compte-traite.entity';
import { CompteTraiteDetail } from 'src/flux-financier/entities/compte-traite-detail.entity';

@Injectable()
export class QuittanceAnnulationService {
  constructor(
    @InjectRepository(Quittance)
    private quittanceRepository: Repository<Quittance>,
    @InjectRepository(QuittanceCession)
    private quittanceCessionRepository: Repository<QuittanceCession>,

    @InjectRepository(Bordereau)
    private bordereauRepository: Repository<Bordereau>,
    
    @InjectRepository(CompteTraite)
    private compteTraiteRepository: Repository<CompteTraite>,
    @InjectRepository(CompteTraiteDetail)
    private compteTraiteDetailRepository: Repository<CompteTraiteDetail>,    

    @InjectRepository(EcheancePmd)
    private echeancePmdRepository: Repository<EcheancePmd>,
    @InjectRepository(NoteDebitCredit)
    private ndcRepository: Repository<NoteDebitCredit>,
    @InjectRepository(Reglement)
    private reglementRepository: Repository<Reglement>,
    @InjectRepository(ReglementDetail)
    private reglementDetailRepository: Repository<ReglementDetail>,
    //@InjectRepository(ObjetAssure)
    //private objetAssureRepository: Repository<ObjetAssure>,
    @InjectRepository(SinistreQuittance)
    private sinistreQuittanceRepository: Repository<SinistreQuittance>,
    @InjectRepository(SinistreEvaluationQuittance)
    private sinistreEvalQuittanceRepository: Repository<SinistreEvaluationQuittance>,
    @InjectRepository(SinistreEvaluationQuittanceCession)
    private sinistreEvalQuittanceCessionRepository: Repository<SinistreEvaluationQuittanceCession>,
    private dataSource: DataSource,
  ) {}

  /**
   * Annule une Quittance et TOUTES ses entités liées dans une transaction
   */
  async annuler(id: number): Promise<Quittance> {
    // 1. Récupérer la quittance originale
    const quittance = await this.quittanceRepository.findOne({
      where: { id },
      relations: [
        'quittancesCession',
        'bordereaux',
        'echeancesPmd',
        'comptesTraite',
        'notesDebitCredit',
        
      ],
    });

    if (!quittance) {
      throw new NotFoundException(`Quittance with id ${id} not found`);
    }

    // Vérifier qu'elle n'est pas déjà annulée
    if (quittance.isAnnule) {
      throw new BadRequestException(`Quittance ${id} is already cancelled`);
    }

    // 2. Créer un QueryRunner pour la transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const now = new Date();

      // ============================================================
      // ÉTAPE 1 : Annuler les QuittanceCession et leurs dépendances
      // ============================================================
      for (const qc of quittance.quittancesCession || []) {
        await this.annulerQuittanceCession(qc.id, queryRunner, now);
      }

      // ============================================================
      // ÉTAPE 2 : Annuler les Bordereaux (liés directement à la quittance)
      // ============================================================
      for (const bordereau of quittance.bordereaux || []) {
        await this.annulerBordereau(bordereau.id, queryRunner, now);
      }

      // ============================================================
      // ÉTAPE 3 : Annuler les EcheancesPmd (liées directement)
      // ============================================================
      for (const ep of quittance.echeancesPmd || []) {
        await this.annulerEcheancePmd(ep.id, queryRunner, now);
      }

      // ============================================================
      // ÉTAPE 4 : Annuler les NotesDebitCredit (liées directement)
      // ============================================================
      for (const cpt of quittance.ComptesTraite || []) {
        await this.annulerCompteTraite(cpt.id, queryRunner, now);
      }

      // for (const ndc of quittance.notesDebitCredit || []) {
      //   await this.annulerNoteDebitCredit(ndc.id, queryRunner, now);
      // }

      // ============================================================
      // ÉTAPE 5 : Annuler les SinistreEvaluationQuittances
      // ============================================================
      await this.annulerSinistreEvaluationQuittances(id, queryRunner, now);

      // ============================================================
      // ÉTAPE 6 : Annuler les SinistreQuittances
      // ============================================================
      await this.annulerSinistreQuittances(id, queryRunner, now);

      // ============================================================
      // ÉTAPE 7 : Annuler les ObjetsAssures
      // ============================================================
    //   for (const oa of quittance.objetsAssures || []) {
    //     await queryRunner.manager.delete(ObjetAssure, oa.id);
    //   }

      // ============================================================
      // ÉTAPE 8 : Marquer la Quittance comme annulée
      // ============================================================
      quittance.isAnnule = true;
      quittance.updatedAt = now;
      await queryRunner.manager.save(Quittance, quittance);

      // ============================================================
      // ÉTAPE 9 : Créer la Quittance d'annulation (copie miroir)
      // ============================================================
      const quittanceAnnulation = this.quittanceRepository.create({
        ...quittance,
        id: undefined,
        isAnnule: true,
        idQuittanceAnnule: quittance.id,
        createdAt: now,
        updatedAt: now,
      });
      const savedAnnulation = await queryRunner.manager.save(
        Quittance,
        quittanceAnnulation,
      );

      // Commit de la transaction
      await queryRunner.commitTransaction();

      // Recharger avec toutes les relations
      return await this.quittanceRepository.findOneOrFail({
        where: { id: savedAnnulation.id },
        relations: [
          'police', 'acteur', 
          'quittancesCession', 'bordereaux', 'echeancesPmd',
          'notesDebitCredit', 
        ],
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  // =========================================================================
  // MÉTHODES PRIVÉES D'ANNULATION EN CASCADE
  // =========================================================================

  /**
   * Annule une QuittanceCession et toutes ses dépendances
   */
  private async annulerQuittanceCession(
    qcId: number,
    queryRunner: QueryRunner,
    now: Date,
  ): Promise<void> {
    const qc = await queryRunner.manager.findOne(QuittanceCession, {
      where: { id: qcId },
      relations: ['bordereaux', 'echeancesPmd', 'notesDebitCredit'],
    });

    if (!qc || qc.isAnnule) return;

    // Annuler les bordereaux de cette cession
    for (const bordereau of qc.bordereaux || []) {
      await this.annulerBordereau(bordereau.id, queryRunner, now);
    }

    // Annuler les échéances PMD de cette cession
    for (const ep of qc.echeancesPmd || []) {
      await this.annulerEcheancePmd(ep.id, queryRunner, now);
    }

    // Annuler les notes débit/crédit de cette cession
    // for (const ndc of qc.notesDebitCredit || []) {
    //   await this.annulerNoteDebitCredit(ndc.id, queryRunner, now);
    // }

    // Annuler les SinistreEvaluationQuittanceCession
    await queryRunner.manager.update(
      SinistreEvaluationQuittanceCession,
      { quittanceCessionId: qcId, isAnnule: false },
      {
        isAnnule: true,
        sinistreEvaluationCessionIdAnnule: null,
        updatedAt: now,
      },
    );

    // Créer la copie d'annulation de QuittanceCession
    const qcAnnulation = this.quittanceCessionRepository.create({
      ...qc,
      id: undefined,
      isAnnule: true,
      quittanceCessionIdAnnule: qc.id ,
      createdAt: now,
      updatedAt: now,
    });
    await queryRunner.manager.save(QuittanceCession, qcAnnulation);

    // Marquer l'originale comme annulée
    qc.isAnnule = true;
    qc.updatedAt = now;
    await queryRunner.manager.save(QuittanceCession, qc);
  }

  /**
   * Annule un Bordereau et ses NotesDebitCredit liées
   */
  private async annulerBordereau(
    bordereauId: number,
    queryRunner: QueryRunner,
    now: Date,
  ): Promise<void> {
    const bordereau = await queryRunner.manager.findOne(Bordereau, {
      where: { id: bordereauId },
      relations: ['notesDebitCredit'],
    });

    if (!bordereau || bordereau.isAnnule) return;

    // Annuler les NDC liées à ce bordereau
    for (const ndc of bordereau.notesDebitCredit || []) {
      await this.annulerNoteDebitCredit(ndc.id, queryRunner, now);
    }

    // Créer la copie d'annulation
    const bordereauAnnulation = this.bordereauRepository.create({
      ...bordereau,
      id: undefined,
      montant: - bordereau.montant,
      isAnnule: true,
      bordereauIdAnnule: bordereau.id,
      createdAt: now,
      updatedAt: now,
    });
    await queryRunner.manager.save(Bordereau, bordereauAnnulation);

    bordereau.isAnnule = true;
    bordereau.updatedAt = now;
    await queryRunner.manager.save(Bordereau, bordereau);
  }

  /**
   * Annule une EcheancePmd et ses NotesDebitCredit liées
   */
  private async annulerEcheancePmd(
    epId: number,
    queryRunner: QueryRunner,
    now: Date,
  ): Promise<void> {
    const ep = await queryRunner.manager.findOne(EcheancePmd, {
      where: { id: epId },
      relations: ['notesDebitCredit'],
    });

    if (!ep || ep.isAnnule) return;

    for (const ndc of ep.notesDebitCredit || []) {
      await this.annulerNoteDebitCredit(ndc.id, queryRunner, now);
    }

    const epAnnulation = this.echeancePmdRepository.create({
      ...ep,
      id: undefined,
      isAnnule: true,
      echeancePmdIdAnnule: ep.id,
      createdAt: now,
      updatedAt: now,
    });
    await queryRunner.manager.save(EcheancePmd, epAnnulation);

    ep.isAnnule = true;
    ep.updatedAt = now;
    await queryRunner.manager.save(EcheancePmd, ep);
  }

 
    /**
   * Annule une EcheancePmd et ses NotesDebitCredit liées
   */
  private async annulerCompteTraite(
    cptId: number,
    queryRunner: QueryRunner,
    now: Date,
  ): Promise<void> {
    const compteTraite = await queryRunner.manager.findOne(CompteTraite, {
      where: { id: cptId },
      relations: ['notesDebitCredit','compteTraiteDetails'],
    });

    if (!compteTraite || compteTraite.isAnnule) return;

    for (const ndc of compteTraite.notesDebitCredit || []) {
      await this.annulerNoteDebitCredit(ndc.id, queryRunner, now);
    }

    const cptAnnulation = this.compteTraiteRepository.create({
      ...compteTraite,
      solde : - compteTraite.solde,      
      id: undefined,
      isAnnule: true,
      compteTratieIdAnnule: compteTraite.id,
      createdAt: now,
      updatedAt: now,
    });
    await queryRunner.manager.save(CompteTraite, cptAnnulation);

    // Créer les copies d'annulation de TOUS les CompteTraiteDetail du CompteTraite
    // (pour maintenir la cohérence : un CompteTraite annulé doit avoir tous ses détails annulés)
    for (const detail of compteTraite.compteTraiteDetails || []) {
      const detailAnnulation = this.compteTraiteDetailRepository.create({
        ...detail,
        id: undefined,
        credit: - detail.credit,
        debit: - detail.debit,
        isAnnule:true,
        compteTratieDetailIdAnnule: detail.id,
      });
      await queryRunner.manager.save(CompteTraiteDetail, detailAnnulation);
    }


    compteTraite.isAnnule = true;
    compteTraite.updatedAt = now;
    await queryRunner.manager.save(CompteTraite, compteTraite);
  }

  // =========================================================================
  // Annulation d'une NoteDebitCredit (CORRIGÉ)
  // =========================================================================

  /**
   * Annule une NoteDebitCredit et tous les ReglementDetail/Reglement associés.
   *
   * Schéma : NoteDebitCredit ← ReglementDetail → Reglement
   *
   * Étapes :
   * 1. Trouver tous les ReglementDetail qui référencent cette NDC
   * 2. Grouper par Reglement parent
   * 3. Pour chaque Reglement concerné :
   *    - Créer une copie d'annulation du Reglement
   *    - Créer des copies d'annulation de ses ReglementDetail
   *    - Marquer le Reglement original comme annulé
   * 4. Créer une copie d'annulation de la NDC
   * 5. Marquer la NDC originale comme annulée
   */
  private async annulerNoteDebitCredit(
    ndcId: number,
    queryRunner: QueryRunner,
    now: Date,
  ): Promise<void> {
    // ✅ CORRECTION : on charge la NDC avec ses reglementDetails (et non reglements)
    const ndc = await queryRunner.manager.findOne(NoteDebitCredit, {
      where: { id: ndcId },
      relations: ['reglementDetails', 'reglementDetails.reglement'],
    });

    if (!ndc || ndc.isAnnule) return;

    // Étape 1 : Grouper les ReglementDetail par Reglement parent
    const reglementsMap = new Map<number, ReglementDetail[]>();

    for (const rd of ndc.reglementDetails || []) {
      if (!rd.reglement || rd.reglement.isAnnule) continue;

      const regId = rd.reglement.id;

      // Récupérer le tableau existant ou en créer un nouveau
      let details = reglementsMap.get(regId);
      if (!details) {
        details = [];
        reglementsMap.set(regId, details);
      }

    // Ajouter le détail (TypeScript sait ici que 'details' n'est plus undefined)
    details.push(rd);
    }

    // Étape 2 : Pour chaque Reglement concerné, créer une copie d'annulation
    for (const [regId, details] of reglementsMap.entries()) {
      await this.annulerReglement(regId, details, queryRunner, now);
    }

    // Étape 3 : Créer la copie d'annulation de la NDC
    const ndcAnnulation = this.ndcRepository.create({
      ...ndc,
      id: undefined,
      montant: - ndc.montant,
      isAnnule: true,
      noteDebitCreditIdAnnule: ndc.id,
      createdAt: now,
      updatedAt: now,
    });
    await queryRunner.manager.save(NoteDebitCredit, ndcAnnulation);

    // Étape 4 : Marquer la NDC originale comme annulée
    ndc.isAnnule = true;
    ndc.updatedAt = now;
    await queryRunner.manager.save(NoteDebitCredit, ndc);
  }

  // =========================================================================
  // Annulation d'un Reglement (CORRIGÉ)
  // =========================================================================

  /**
   * Annule un Reglement en créant une copie miroir.
   *
   * @param reglementId - ID du règlement à annuler
   * @param detailsConcernes - Les ReglementDetail de ce règlement qui référencent la NDC annulée
   * @param queryRunner - QueryRunner de la transaction
   * @param now - Timestamp de l'annulation
   */
  private async annulerReglement(
    reglementId: number,
    detailsConcernes: ReglementDetail[],
    queryRunner: QueryRunner,
    now: Date,
  ): Promise<void> {
    // Charger le Reglement avec TOUS ses détails (pas seulement ceux liés à la NDC)
    const reglement = await queryRunner.manager.findOne(Reglement, {
      where: { id: reglementId },
      relations: ['details', 'details.noteDebitCredit'],
    });

    if (!reglement || reglement.isAnnule) return;

    // Créer la copie d'annulation du Reglement
    const reglementAnnulation = this.reglementRepository.create({
      ...reglement,
      id: undefined,
      montant: - reglement.montant,
      isAnnule: true,
      reglementIdAnnule: reglement.id,
      createdAt: now,
      updatedAt: now,
    });
    const savedReglement = await queryRunner.manager.save(Reglement, reglementAnnulation);

    // Créer les copies d'annulation de TOUS les ReglementDetail du règlement
    // (pour maintenir la cohérence : un règlement annulé doit avoir tous ses détails annulés)
    for (const detail of reglement.reglementDetails || []) {
      const detailAnnulation = this.reglementDetailRepository.create({
        ...detail,
        id: undefined,
        montant: - detail.montant,
        reglementId: savedReglement.id,
        // On garde la même référence noteDebitCreditId
        // (la NDC originale reste référencée, mais elle aussi sera marquée isAnnule)
      });
      await queryRunner.manager.save(ReglementDetail, detailAnnulation);
    }

    // Marquer le Reglement original comme annulé
    reglement.isAnnule = true;
    reglement.updatedAt = now;
    await queryRunner.manager.save(Reglement, reglement);
  }

  /**
   * Annule les SinistreEvaluationQuittances liées à une quittance
   */
  private async annulerSinistreEvaluationQuittances(
    quittanceId: number,
    queryRunner: QueryRunner,
    now: Date,
  ): Promise<void> {
    const seqs = await queryRunner.manager.find(SinistreEvaluationQuittance, {
      where: { quittanceId },
    });

    for (const seq of seqs) {
      // Annuler les SinistreEvaluationQuittanceCession associées
      await queryRunner.manager.update(
        SinistreEvaluationQuittanceCession,
        { quittanceId: seq.id, isAnnule: false },
        {
          isAnnule: true,
          updatedAt: now,
        },
      );

      // Créer la copie d'annulation
      const seqAnnulation = this.sinistreEvalQuittanceRepository.create({
        ...seq,
        id: undefined,
        createdAt: now,
        updatedAt: now,
      });
      await queryRunner.manager.save(SinistreEvaluationQuittance, seqAnnulation);
    }
  }

  /**
   * Annule les SinistreQuittances liées à une quittance
   */
  private async annulerSinistreQuittances(
    quittanceId: number,
    queryRunner: QueryRunner,
    now: Date,
  ): Promise<void> {
    const sinistreQuittances = await queryRunner.manager.find(SinistreQuittance, {
      where: { quittanceId },
    });

    for (const sq of sinistreQuittances) {
      const sqAnnulation = this.sinistreQuittanceRepository.create({
        ...sq,
        id: undefined,
        createdAt: now,
        updatedAt: now,
      });
      await queryRunner.manager.save(SinistreQuittance, sqAnnulation);
    }
  }
}