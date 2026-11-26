// quittance.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quittance } from '../entities/quittance.entity';
import { Transactional } from '@nestjs-cls/transactional';
import { CrudService } from 'src/common/crud/crud.service';
import { QuittanceCalculService } from './quittance-calcul.service';
import { CreateQuittanceDto } from '../dto/create-quittance.dto';
import { UpdateQuittanceDto } from '../dto/update-quittance.dto';
import Decimal from 'decimal.js';
import { formatDecimal, formatDate } from 'src/common/utilitaire/formatters';
import { fail } from 'node:assert';
import { failure } from 'src/common/helper/response.helper';



@Injectable()
export class QuittanceService extends CrudService<Quittance> {
  constructor(
    @InjectRepository(Quittance)
    private readonly  quittanceRepository: Repository<Quittance>,
    private readonly calculService: QuittanceCalculService,
  ) {
    super(quittanceRepository);
  }
// En haut de votre classe de service (hors des méthodes)
// private readonly frCurrencyFormatter = new Intl.NumberFormat('fr-FR', {
//   minimumFractionDigits: 2,
//   maximumFractionDigits: 2,
// });
  // ── CRÉATION : on calcule AVANT de persister ──────────────
async create(dto: CreateQuittanceDto): Promise<Quittance> {
  const partial = this.calculService.appliquer(dto as any);
  const data = { ...(dto as any), ...partial };
  return super.create(data); // ← utilise la méthode parente
}

  // ── MISE À JOUR : recalcul + verrou si émise ──────────────
  async update(id: number, dto: UpdateQuittanceDto): Promise<Quittance> {
    const quittance = await this.quittanceRepository.findOneOrFail({ where: { id } });


    Object.assign(quittance, dto);
    Object.assign(quittance, this.calculService.appliquer(quittance));

    return this.quittanceRepository.save(quittance);
  }

  // ── ÉMISSION : verrou définitif ───────────────────────────
  @Transactional()
  async emettre(id: number): Promise<Quittance> {
    const quittance = await this.quittanceRepository.findOneOrFail({ where: { id } });
   
    return this.quittanceRepository.save(quittance);
  }

  // ── ANNULATION : copie miroir (ton pattern existant) ──────
  
  @Transactional()
  async annuler(id: number): Promise<Quittance> {
    const quittance = await this.quittanceRepository.findOne({
      where: { id },
      relations: ['bordereaux', 'echeancesPmd', 'comptesTraite'],
    });
    if (!quittance) throw new NotFoundException(`Quittance ${id} introuvable`);
    if (quittance.isAnnule) {
      throw new BadRequestException(`Quittance ${id} déjà annulée`);
    }

    // 1. Copie miroir "annulée" (montants inversés si besoin métier)
    const annulation = this.quittanceRepository.create({
      ...quittance,
      id: undefined,
      isAnnule: true,
      quittanceIdAnnule: id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const quittanceAnnulation = await this.quittanceRepository.save(annulation);

    // 2. Marque l'originale
    quittance.isAnnule = true;
    quittance.quittanceIdAnnule = quittanceAnnulation.id;
    await this.quittanceRepository.save(quittance);

    // 3. Cascade d'annulation
    // TODLIST
/*
    for (const b of quittance.bordereaux || []) await this.bordereauService.annuler(b.id);
    for (const p of quittance.echeancesPmd || []) await this.echeancePmdService.annuler(p.id);
    for (const c of quittance.comptesTraite || []) await this.compteService.annuler(c.id);
*/
    return quittanceAnnulation;
  }

  // ── SIMULATION : pour le frontend (aperçu non contractuel) ─
  simuler(dto: Partial<Quittance>): Partial<Quittance> {
    return this.calculService.calculer(dto);
  }

  
  // Dans votre QuittanceService ou PdfService
  async printQuittanceSingle(quittanceId: number): Promise<any> {
    console.log(' ____ QuittanceService.printQuittanceSingle ____') 
  
    const quittance = await this.quittanceRepository.findOne({
      where: { id: quittanceId },
      relations: [
        'police', 
        'police.natureOffre', 
        'police.sousBranche', 
        'police.acteurCedante',
        'devise', 'mouvement',
        'quittancePlacements',
        'quittancePlacements.naturePlacement',        
        'quittanceTranches',
      ]
    });
    if (!quittance) throw new NotFoundException(failure( `Quittance ${quittanceId} introuvable`));
    console.log(' quittance:',quittance) 
    const natureOffre = quittance.police.natureOffre
    const isProportionnelle = natureOffre.isProportionnelle 
    const isQuotePart =natureOffre.isQuotePart   
    const isEdp =natureOffre.isEdp   
    const isFacultative =natureOffre.isFacultative
    const isFacObligatoire =natureOffre.isFacObligatoire
    const isXs =natureOffre.isXs
    // 2. Calculer les totaux pour le tfoot de la table placements
    const totalEstimationPrime = quittance.quittancePlacements
      .reduce((sum, p) => sum.plus(p.estimationPrime), new Decimal(0));

    const totalPrimeCedee = quittance.quittancePlacements
      .reduce((sum, p) => sum.plus(p.primeCedee), new Decimal(0));

    const totalPrimeNette = quittance.quittancePlacements
      .reduce((sum, p) => sum.plus(p.primeNette), new Decimal(0));
    console.log(' ___________') 
    console.log(' totalEstimationPrime:',totalEstimationPrime) 
    console.log(' totalPrimeCedee:',totalPrimeCedee) 
    console.log(' totalPrimeNette:',totalPrimeNette) 
    console.log(' ___________') 
    // 3. Construire le contexte du template
    const context = {
      quittance: {
        ...quittance,
        
        ///////////////////////////// 
        ////// CAPITAUX 
        /////////////////////////////          
        capitaux: formatDecimal(quittance.capitaux),
        lci: formatDecimal(quittance.lci),
        smp: formatDecimal(quittance.smp),
        limite: formatDecimal(quittance.limite),
        sinistreAuComptant: formatDecimal(quittance.sinistreAuComptant),
        retention: formatDecimal(quittance.retention),
        conservation: formatDecimal(quittance.conservation),
        capacite: formatDecimal(quittance.capacite),
        portee: formatDecimal(quittance.portee),
        priorite: formatDecimal(quittance.priorite),
        
        ///////////////////////////// 
        ////// PRIMES 
        /////////////////////////////
        estimationPrime: formatDecimal(quittance.estimationPrime),
        primeBrute: formatDecimal(quittance.primeBrute),
        primeNette: formatDecimal(quittance.primeNette),
        primeCedee: formatDecimal(quittance.primeCedee),
        primeAcceptee: formatDecimal(quittance.primeAcceptee),
        
        ///////////////////////////// 
        ////// TAUX & TAXES
        /////////////////////////////
        coursDevise: formatDecimal(quittance.coursDevise),
        tauxCedante: formatDecimal(quittance.tauxCedante),
        tauxAccepte: formatDecimal(quittance.tauxAccepte),
        commissionFixe: formatDecimal(quittance.commissionFixe),
        tauxCommission: formatDecimal(quittance.tauxCommission),
        taxeSurCommission: formatDecimal(quittance.taxeSurCommission),
        taxeSurPrime: formatDecimal(quittance.taxeSurPrime),
        avisSinistre: formatDecimal(quittance.avisSinistre),
        aliment: formatDecimal(quittance.aliment),
        
        ///////////////////////////// 
        ////// DATES
        /////////////////////////////
        dateEmissionFormatee: formatDate(quittance.dateEmission),
        dateEffetFormatee: formatDate(quittance.dateEffet),
        dateEcheanceFormatee: formatDate(quittance.dateEcheance),

        ///////////////////////////// 
        ////// PLACEMENTS (tableau formaté)
        /////////////////////////////
        quittancePlacements: quittance.quittancePlacements.map(p => ({
          ...p,
          estimationPrime: formatDecimal(p.estimationPrime),
          primeBrute: formatDecimal(p.primeBrute),
          primeCedee: formatDecimal(p.primeCedee),
          primeNette: formatDecimal(p.primeNette),
          commissionFixe: formatDecimal(p.commissionFixe),
          tauxCession: formatDecimal(p.tauxCession),
          tauxCommission: formatDecimal(p.tauxCommission),
          taxeSurPrime: formatDecimal(p.taxeSurPrime),
          taxeSurCommission: formatDecimal(p.taxeSurCommission),
        })),

        ///////////////////////////// 
        ////// TRANCHES (tableau formaté)
        /////////////////////////////
        quittanceTranches: quittance.quittanceTranches.map(t => ({
          ...t,
          priorite: formatDecimal(t.priorite),
          portee: formatDecimal(t.portee),
          estimationPrime: formatDecimal(t.estimationPrime),
          tauxPrime: formatDecimal(t.tauxPrime),
          primeTranche: formatDecimal(t.primeTranche),
          tauxCommission: formatDecimal(t.tauxCommission),
          taxeSurCommission: formatDecimal(t.taxeSurCommission),
        })),
      },
      // -----
      isProportionnelle,
      isQuotePart,
      isEdp,
      isFacultative,
      isFacObligatoire,
      isXs,
      // -----
      totalEstimationPrime: formatDecimal(totalEstimationPrime),
      totalPrimeCedee: formatDecimal(totalPrimeCedee),
      totalPrimeNette: formatDecimal(totalPrimeNette),
      dateGeneration: new Date().toLocaleDateString('fr-FR'),
    };
    console.log(' context pour HandleBar:',context)
    // 4. Appel au service PDF
    //return this.pdfService.renderTemplate('quittance-single', context);
    return context;
  }
}