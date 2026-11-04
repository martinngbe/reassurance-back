// quittancePlacement.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from '@nestjs-cls/transactional';
import { CrudService } from 'src/common/crud/crud.service';
import { QuittancePlacement } from '../entities/quittance-placement.entity';
import { QuittancePlacementCalculService } from './quittance-placement-calcul.service';
import { CreateQuittancePlacementDto } from '../dto/create-quittance-placement.dto';
import { UpdateQuittancePlacementDto } from '../dto/update-quittance-placement.dto';
import Decimal from 'decimal.js';
import { Quittance } from '../entities/quittance.entity';
import { failure } from 'src/common/helper/response.helper';

@Injectable()
export class QuittancePlacementService extends CrudService<QuittancePlacement> {
  constructor(
    @InjectRepository(QuittancePlacement)
    private readonly  quittancePlacementRepository: Repository<QuittancePlacement>,
    @InjectRepository(Quittance)
    private readonly quittanceRepository: Repository<Quittance>,
    private readonly calculService: QuittancePlacementCalculService,
  ) {
    super(quittancePlacementRepository);
  }

  // ── CRÉATION : on calcule AVANT de persister ──────────────
async create(dto: CreateQuittancePlacementDto): Promise<QuittancePlacement> {
  // 1. Validation métier AVANT calcul
  await this.validerTauxCession(
      dto.quittanceId,
      new Decimal(dto.tauxCession),
    );

    // 2. Calcul des montants dérivés
  const partial = this.calculService.appliquer(dto as any);
  const data = { ...(dto as any), ...partial };
   // 3. Persistance
  return super.create(data); // ← utilise la méthode parente
}

  // ── MISE À JOUR : recalcul + verrou si émise ──────────────
  async update(id: number, dto: UpdateQuittancePlacementDto): Promise<QuittancePlacement> {
    const quittancePlacement = await this.quittancePlacementRepository.findOneOrFail({ where: { id } });

    

    // 1. Validation métier (en excluant le placement en cours de modif)
    if (dto.tauxCession !== undefined) {
      await this.validerTauxCession(
        quittancePlacement.quittanceId,
        new Decimal(dto.tauxCession),
        id, // ← important : exclure l'ancien taux de ce placement
      );
    }

    // 2. Mise à jour + recalcul
    Object.assign(quittancePlacement, dto);
    Object.assign(quittancePlacement, this.calculService.appliquer(quittancePlacement));

    return this.quittancePlacementRepository.save(quittancePlacement);
  }

  // ── ÉMISSION : verrou définitif ───────────────────────────
  @Transactional()
  async emettre(id: number): Promise<QuittancePlacement> {
    const quittancePlacement = await this.quittancePlacementRepository.findOneOrFail({ where: { id } });
    // if (quittancePlacement.estEmise) {
    //   throw new BadRequestException( failure(`QuittancePlacement ${id} déjà émise.`));
    // }
    // quittancePlacement.estEmise = true;
    return this.quittancePlacementRepository.save(quittancePlacement);
  }

  // ── ANNULATION : copie miroir (ton pattern existant) ──────  
  @Transactional()
  async annuler(id: number): Promise<QuittancePlacement> {
    const quittancePlacement = await this.quittancePlacementRepository.findOne({
      where: { id },
      relations: ['bordereaux', 'echeancesPmd', 'comptesTraite'],
    });
    if (!quittancePlacement) throw new NotFoundException(`QuittancePlacement ${id} introuvable`);
    if (quittancePlacement.isAnnule) {
      throw new BadRequestException(`QuittancePlacement ${id} déjà annulée`);
    }

    // 1. Copie miroir "annulée" (montants inversés si besoin métier)
    const annulation = this.quittancePlacementRepository.create({
      ...quittancePlacement,
      id: undefined,
      isAnnule: true,
      quittancePlacementIdAnnule: id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const quittancePlacementAnnulation = await this.quittancePlacementRepository.save(annulation);

    // 2. Marque l'originale
    quittancePlacement.isAnnule = true;
    quittancePlacement.quittancePlacementIdAnnule = quittancePlacementAnnulation.id;
    await this.quittancePlacementRepository.save(quittancePlacement);

    // 3. Cascade d'annulation
    // TODLIST
/*
    for (const b of quittancePlacement.bordereaux || []) await this.bordereauService.annuler(b.id);
    for (const p of quittancePlacement.echeancesPmd || []) await this.echeancePmdService.annuler(p.id);
    for (const c of quittancePlacement.comptesTraite || []) await this.compteService.annuler(c.id);
*/
    return quittancePlacementAnnulation;
  }

  // ── SIMULATION : pour le frontend (aperçu non contractuel) ─
  simuler(dto: Partial<QuittancePlacement>): Partial<QuittancePlacement> {
    return this.calculService.calculer(dto);
  }

 // ── VALIDATION MÉTIER ─────────────────────────────────────
  /**
   * Vérifie que le cumul des taux de cession ne dépasse pas le taux accepté
   */
  private async validerTauxCession(
    quittanceId: number,
    nouveauTaux: Decimal,
    placementIdExistant?: number,
  ): Promise<void> {
    // Charger la quittance avec ses placements (eager:true déjà configuré)
    const quittance = await this.quittanceRepository.findOne({
      where: { id: quittanceId },
    });

    if (!quittance) {
      throw new NotFoundException(`Quittance ${quittanceId} introuvable`);
    }

    // Calculer le cumul actuel (hors placements annulés)
    const cumulActuel = (quittance.quittancePlacements || [])
      .filter((p) => !p.isAnnule && p.id !== placementIdExistant)
      .reduce((acc, p) => acc.plus(p.tauxCession), new Decimal(0));

    const nouveauCumul = cumulActuel.plus(nouveauTaux);

    if (nouveauCumul.gt(quittance.tauxAccepte)) {
      throw new BadRequestException( failure(
        `Le cumul des taux de cession (${nouveauCumul.toFixed(4)}%) ` +
        `dépasse le taux accepté (${quittance.tauxAccepte.toFixed(4)}%). ` +
        `Cumul actuel : ${cumulActuel.toFixed(4)}%, taux demandé : ${nouveauTaux.toFixed(4)}%`, )
      );
    }
  }



    // ── RÉCUPÉRATION ISOLÉE DU CUMUL DES TAUX ─────────────────
    /**
     * Retourne le cumul des taux de cession et le disponible pour une quittance
     * sans charger toute la quittance (juste les placements)
     */
    // async getCumulTauxCession(quittanceId: number): Promise<{
    //   quittanceId: number;
    //   tauxAccepte: string;
    //   cumulTauxCession: string;
    //   tauxDisponible: string;
    //   nombrePlacementsActifs: number;
    // }> {
    //   // Charger uniquement la quittance avec ses placements
    //   const quittance = await this.quittanceRepository.findOne({
    //     where: { id: quittanceId },
    //     select: ['id', 'tauxAccepte'], // ← select limité pour performance
    //     relations: ['quittancePlacements'],
    //   });

    //   if (!quittance) {
    //     throw new NotFoundException( failure(`Quittance ${quittanceId} introuvable`));
    //   }

    //   // Calculer le cumul (hors placements annulés)
    //   const placementsActifs = (quittance.quittancePlacements || []).filter(
    //     (p) => !p.isAnnule,
    //   );

    //   const cumulTauxCession = placementsActifs.reduce(
    //     (acc, p) => acc.plus(p.tauxCession),
    //     new Decimal(0),
    //   );

    //   const tauxDisponible = quittance.tauxAccepte.minus(cumulTauxCession);

    //   return {
    //     quittanceId: quittance.id,
    //     tauxAccepte: quittance.tauxAccepte.toFixed(4),
    //     cumulTauxCession: cumulTauxCession.toFixed(4),
    //     tauxDisponible: tauxDisponible.isNegative() ? '0.0000' : tauxDisponible.toFixed(4),
    //     nombrePlacementsActifs: placementsActifs.length,
    //   };
    // }

// ── RÉCUPÉRATION ISOLÉE DU CUMUL DES TAUX ─────────────────
        /**
         * Retourne le cumul des taux de cession et le disponible pour une quittance.
         * Utilisé par le frontend pour afficher l'état en temps réel.
         */
        async getCumulTauxCession(quittanceId: number): Promise<{
          quittanceId: number;
          tauxAccepte: string;
          cumulTauxCession: string;
          tauxDisponible: string;
          nombrePlacementsActifs: number;
        }> {
          const quittance = await this.quittanceRepository.findOne({
            where: { id: quittanceId },
            select: ['id', 'tauxAccepte'],
            relations: ['quittancePlacements'],
          });

          if (!quittance) {
            throw new NotFoundException(`Quittance ${quittanceId} introuvable`);
          }

          const placementsActifs = (quittance.quittancePlacements || []).filter(
            (p) => !p.isAnnule,
          );

          const cumulTauxCession = placementsActifs.reduce(
            (acc, p) => acc.plus(p.tauxCession),
            new Decimal(0),
          );

          const tauxDisponible = quittance.tauxAccepte.minus(cumulTauxCession);

          return {
            quittanceId: quittance.id,
            tauxAccepte: quittance.tauxAccepte.toFixed(4),
            cumulTauxCession: cumulTauxCession.toFixed(4),
            tauxDisponible: tauxDisponible.isNegative() ? '0.0000' : tauxDisponible.toFixed(4),
            nombrePlacementsActifs: placementsActifs.length,
          };
        }

}