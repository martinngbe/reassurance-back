// quittance.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quittance } from '../entities/quittance.entity';
import { Transactional } from '@nestjs-cls/transactional';
import { BordereauService } from 'src/flux-financier/services/bordereau.service';
import { EcheancePmdService } from '../../flux-financier/services/echeance-pmd.service';
import { CompteService } from 'src/flux-financier/services/compte.service';
import { CrudService } from 'src/common/crud/crud.service';
import { QuittanceCalculService } from './quittance-calcul.service';
import { CreateQuittanceDto } from '../dto/create-quittance.dto';
import { UpdateQuittanceDto } from '../dto/update-quittance.dto';
import { failure } from 'src/common/helper/response.helper';

@Injectable()
export class QuittanceService extends CrudService<Quittance> {
  constructor(
    @InjectRepository(Quittance)
    private readonly  quittanceRepository: Repository<Quittance>,
    // private readonly bordereauService: BordereauService,
    // private readonly echeancePmdService: EcheancePmdService,
    // private readonly compteService: CompteService,
    private readonly calculService: QuittanceCalculService,
  ) {
    super(quittanceRepository);
  }

  // ── CRÉATION : on calcule AVANT de persister ──────────────
async create(dto: CreateQuittanceDto): Promise<Quittance> {
  const partial = this.calculService.appliquer(dto as any);
  const data = { ...(dto as any), ...partial };
  return super.create(data); // ← utilise la méthode parente
}

  // ── MISE À JOUR : recalcul + verrou si émise ──────────────
  async update(id: number, dto: UpdateQuittanceDto): Promise<Quittance> {
    const quittance = await this.quittanceRepository.findOneOrFail({ where: { id } });

    // if (quittance.estEmise) {
    //   throw new BadRequestException(
    //    failure( `Quittance ${id} émise : créez un avenant ou une quittance d'annulation.`)
    //   );
    // }

    Object.assign(quittance, dto);
    Object.assign(quittance, this.calculService.appliquer(quittance));

    return this.quittanceRepository.save(quittance);
  }

  // ── ÉMISSION : verrou définitif ───────────────────────────
  @Transactional()
  async emettre(id: number): Promise<Quittance> {
    const quittance = await this.quittanceRepository.findOneOrFail({ where: { id } });
    // if (quittance.estEmise) {
    //   throw new BadRequestException( failure(`Quittance ${id} déjà émise.`));
    // }
    // quittance.estEmise = true;
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
}