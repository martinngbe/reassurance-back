// quittancePlacement.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional, TransactionHost } from '@nestjs-cls/transactional';
import { CrudService } from 'src/common/crud/crud.service';
import { QuittancePlacement } from '../entities/quittance-placement.entity';
import { QuittancePlacementCalculService } from './quittance-placement-calcul.service';
import { CreateQuittancePlacementDto } from '../dto/create-quittance-placement.dto';
import { UpdateQuittancePlacementDto } from '../dto/update-quittance-placement.dto';
import Decimal from 'decimal.js';
import { Quittance } from '../entities/quittance.entity';
import { failure } from 'src/common/helper/response.helper';
import { TransactionalAdapterTypeOrm } from '@nestjs-cls/transactional-adapter-typeorm';
import { SeriesService } from 'src/series/series.service';
import { LogMethod } from 'src/common/decorateur/log-method.decorator';
import { buildContextFromFlags, EntityType } from 'src/series';
import { fail } from 'node:assert';
import { CessionLegale } from 'src/referentiel/entities/cession-legale.entity';
import { NaturePlacement } from 'src/referentiel/entities/nature-placement.entity';

@Injectable()
export class QuittancePlacementService extends CrudService<QuittancePlacement> {
  constructor(
    @InjectRepository(QuittancePlacement)
    private readonly  quittancePlacementRepository: Repository<QuittancePlacement>,
    @InjectRepository(Quittance)
    private readonly quittanceRepository: Repository<Quittance>,
    @InjectRepository(CessionLegale)
    private readonly cessionLegaleRepository: Repository<CessionLegale>,
    @InjectRepository(NaturePlacement)
    private readonly naturePlacementRepository: Repository<NaturePlacement>,
    private readonly calculService: QuittancePlacementCalculService,
    private readonly txHost: TransactionHost<TransactionalAdapterTypeOrm>,
    private readonly seriesService: SeriesService,
  ) {
    super(quittancePlacementRepository);
  }

// ── CRÉATION : on calcule AVANT de persister ──────────────
@Transactional()
@LogMethod()
async create(dto: CreateQuittancePlacementDto): Promise<QuittancePlacement> {
  console.log(' _____________________________________ ')
  console.log('     QuittancePlacementService.create ')
  console.log(' _____________________________________ ')
    
  const tx = this.txHost.tx;
  /////////////////////////////////////////////////////////////
  ////   Process de numérotation de la QuittancePlacement
  /////////////////////////////////////////////////////////////
  // 1. Validation : quittanceId obligatoire
  if (!dto.quittanceId) {
    throw new NotFoundException(failure('Le champ quittanceId est obligatoire'));
  }
  // 2. Charger la Quittance avec sa Police (relation eager)
  const quittance = await tx.getRepository(Quittance).findOne({
    where: { id: dto.quittanceId },
    relations: { police: true },
    loadEagerRelations: false,
  });

  if (!quittance) {
      throw new NotFoundException(failure(`Quittance ${dto.quittanceId} introuvable`));
  }
 console.log('     quittance:',quittance)
  if (!quittance.police) {
        throw new NotFoundException(failure(
          `La Quittance ${dto.quittanceId} n'a pas de Police associée`),
        );
  }
  // 3. Déduire le contexte depuis la Police parente
  const serieContext = buildContextFromFlags(
    quittance.police.isCession,
    quittance.police.isFac,
  );
    // 4. Générer le numéro de Bordereau (BAF-26-00001 / BAT / BCF / BCT)
    const numero = await this.seriesService.nextNumero(
      EntityType.RETROCESSION,
      serieContext,
    );
  /////////////////////////////////////////////////////////////
  ////    FIN
  /////////////////////////////////////////////////////////////
  //// 1. Validation métier AVANT calcul 
  console.log('      Validation métier AVANT calcul  dto:',dto) 
  await this.validerTauxCession(
      dto.quittanceId,
      new Decimal(dto.tauxCession),
    );

    // 2. Calcul des montants dérivés
  const partial = this.calculService.appliquer(dto as any);
  const data = { ...(dto as any), ...partial , numero };
   // 3. Persistance
  return super.create(data); // ← utilise la méthode parente
}
// ── MISE À JOUR : recalcul + verrou si émise ──────────────
async update(id: number, dto: UpdateQuittancePlacementDto): Promise<QuittancePlacement> {
  const quittancePlacement = await this.quittancePlacementRepository.findOneOrFail({ where: { id } });
  console.log(' ______ QuittancePlacementService.update _____ ')
  console.log(' dto :',dto)
  console.log(' quittancePlacement :',quittancePlacement)
  

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
  // 3. Mise à jour EXPLICITE des relations (CRUCIAL pour TypeORM)
  // On utilise 'in' pour gérer correctement les valeurs null (ex: si on veut supprimer la relation)
  if ('acteurId' in dto) {
    quittancePlacement.acteur = dto.acteurId ? { id: dto.acteurId } as any : null;
  }
  if ('naturePlacementId' in dto) {
    quittancePlacement.naturePlacement = dto.naturePlacementId ? { id: dto.naturePlacementId } as any : null;
  }
  if ('quittanceId' in dto) {
    quittancePlacement.quittance = dto.quittanceId ? { id: dto.quittanceId } as any : null;
  }

  Object.assign(quittancePlacement, this.calculService.appliquer(quittancePlacement));
  const resultat = await this.quittancePlacementRepository.save(quittancePlacement);
  console.log(' resultat :',resultat)
  return resultat
}

// ── ÉMISSION : verrou définitif ───────────────────────────
@Transactional()
async emettre(id: number): Promise<QuittancePlacement> {
  const quittancePlacement = await this.quittancePlacementRepository.findOneOrFail({ where: { id } });

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
@LogMethod()
private async validerTauxCession(
  quittanceId: number,
  nouveauTaux: Decimal,
  placementIdExistant?: number,
): Promise<void> {
  // Charger la quittance avec ses placements (eager:true déjà configuré)
  const quittance = await this.quittanceRepository.findOne({
    where: { id: quittanceId },
    relations: { police: { natureOffre: true } }, // 👈 Ajout de natureOffre
    loadEagerRelations: false,
  });

  if (!quittance) {
    throw new NotFoundException(failure(`Quittance ${quittanceId} introuvable`) );
  }

  // Calculer le cumul actuel (hors placements annulés)
  const cumulActuel = (quittance.quittancePlacements || [])
    .filter((p) => !p.isAnnule && p.id !== placementIdExistant)
    .reduce((acc, p) => acc.plus(p.tauxCession), new Decimal(0));

  const nouveauCumul = cumulActuel.plus(nouveauTaux);
  const isProportionnelle = quittance.police.natureOffre.isProportionnelle
  // les quittances proportionnelles on un tauxAccepte !=0 ET un tauxCession
  // ce qui n'est pas le cas des quittances non proportionnelles
  // Donc par defaut tauxAccepte sera égal à 100%
  const tauxAccepte = isProportionnelle?quittance.tauxAccepte : 100.00
  if (nouveauCumul.gt(tauxAccepte)) {
    throw new BadRequestException( failure(
      `Le cumul des taux de cession (${nouveauCumul.toFixed(4)}%) ` +
      `dépasse le taux accepté (${tauxAccepte.toFixed(4)}%). ` +
      `Cumul actuel : ${cumulActuel.toFixed(4)}%, taux demandé : ${nouveauTaux.toFixed(4)}%`, )
    );
  }
}

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
      // Passage à la syntaxe objet pour plus de clarté et de sécurité
      relations: { 
        quittancePlacements: true, 
        police: { natureOffre: true } // 👈 Ajout de natureOffre
      },
    });

    if (!quittance) {
      throw new NotFoundException(failure(`Quittance ${quittanceId} introuvable`) );
    }

    const placementsActifs = (quittance.quittancePlacements || []).filter(
      (p) => !p.isAnnule,
    );
    //console.log(' __________ QuittancePlacementService quittance:',quittance)   
    const police = quittance.police
    //console.log(' __________ QuittancePlacementService police:',police)
    const natureOffre=police.natureOffre 
    //console.log(' __________ QuittancePlacementService natureOffre:',natureOffre)
    const isProportionnelle = natureOffre.isProportionnelle
    //console.log(' __________ QuittancePlacementService isProportionnelle:',isProportionnelle)
    const cumulTauxCession = placementsActifs.reduce(
      (acc, p) => acc.plus(p.tauxCession),
      new Decimal(0),
    );
    // les quittances proportionnelles on un tauxAccepte !=0 ET un tauxCession
    // ce qui n'est pas le cas des quittances non proportionnelles
    // Donc par defaut tauxAccepte sera égal à 100%
    const taux100NonProportionnel  = new Decimal(100)
    const tauxDisponible = isProportionnelle?
            quittance.tauxAccepte.minus(cumulTauxCession) :
            taux100NonProportionnel.minus(cumulTauxCession); 

    return {
      quittanceId: quittance.id,
      tauxAccepte: isProportionnelle? quittance.tauxAccepte.toFixed(4) : taux100NonProportionnel.toFixed(2),
      cumulTauxCession: cumulTauxCession.toFixed(4),
      tauxDisponible: tauxDisponible.isNegative() ? '0.0000' : tauxDisponible.toFixed(4),
      nombrePlacementsActifs: placementsActifs.length,
    };
  }

 @Transactional()
 @LogMethod()
  async executeCessionLegale(quittanceId: number , cessionLegaleId : number): Promise<QuittancePlacement>{
    console.log(' _____________________________________ ')
    console.log('     QuittancePlacementService.executeCessionLegale ')
    console.log(' _____________________________________ ')
    
    // lecture de la quittance 
    const quittance = await this.quittanceRepository.findOne({
      where: { id: quittanceId }     
    });

    if (!quittance) {
      throw new NotFoundException(failure(`Quittance ${quittanceId} introuvable`) );
    }
    console.log('    quittance:',quittance)
     // lecture de la cession legale 
    const cessionLegale = await this.cessionLegaleRepository.findOne({
      where: { id: cessionLegaleId }     
    });

    if (!cessionLegale) {
      throw new NotFoundException(failure(`Cession Legale ${cessionLegaleId} introuvable`) );
    }
    console.log('>>>>    cessionLegale:',cessionLegale)
    // lecture NautrePlacement
    const naturePlacement = await this.naturePlacementRepository.findOne({
      where: { code: 'LEG' }     
    });

    if (!naturePlacement) {
      throw new NotFoundException(failure(`Nature Placement légale introuvable`) );
    }

    // Vérifions si cet placement existe déjà
    console.log('>>>>     Vérifions si cet placement existe déjà')
    const isPlacementExiste = await this.quittancePlacementRepository.existsBy(
      {
       quittanceId : quittance.id,
       acteurId : cessionLegale.acteurId,
       naturePlacementId : naturePlacement.id
      }
    )
     console.log('>>>>    isPlacementExiste:',isPlacementExiste)
    if(isPlacementExiste){
        throw new BadRequestException(failure(`Ce Placement légale existe déjà ... `) );
    }

    console.log('    naturePlacement:',naturePlacement)
    const quittancePlacement = this.quittancePlacementRepository.create({
      quittanceId : quittance.id,     
      primeBrute : quittance.primeBrute,   
      estimationPrime : quittance.estimationPrime,   
      tauxCession:   cessionLegale.taux,   // TODO taux 
      tauxCommission: quittance.tauxCommission,   
      commissionFixe: quittance.commissionFixe,   
    
      acteurId:cessionLegale.acteurId, 
      naturePlacementId:naturePlacement.id,
    });

    console.log('  quittancePlacement:',quittancePlacement)
    console.log(' _____________________________________ ')
    return  this.create(quittancePlacement)
  }

}