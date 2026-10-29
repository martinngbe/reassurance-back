import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quittance } from '../entities/quittance.entity';
import { Transactional } from '@nestjs-cls/transactional';
import { BordereauService } from 'src/flux-financier/services/bordereau.service';
import { EcheancePmdService } from '../../flux-financier/services/echeance-pmd.service';
import { CompteService } from 'src/flux-financier/services/compte.service';
import { failure } from 'src/common/helper/response.helper';
import { CrudService } from 'src/common/crud/crud.service';

@Injectable()
export class QuittanceService  extends CrudService<Quittance>{
  constructor(
    @InjectRepository(Quittance)
    private quittanceRepository: Repository<Quittance>,
    private readonly bordereauService: BordereauService,
    private readonly echeancePmdService: EcheancePmdService,
    private readonly compteService: CompteService
  ) {super(quittanceRepository);}
/*
  /////////////////////////////////////
  @Transactional()
  async annuler(id: number): Promise<Quittance> {
    //const quittance = await this.findOne(id);
    // 1. Récupérer la quittance originale
    const quittance = await this.quittanceRepository.findOne({
      where: { id },
      relations: [
        'quittancesCession',
        'bordereaux',
        'echeancesPmd',
        'comptesTraite',        
      ],
    });

    if (!quittance) throw new NotFoundException(`Quittance ${id} not found`);
    // Vérifier qu'elle n'est pas déjà annulée
    if (quittance.isAnnule) {
      throw new BadRequestException(`Quittance ${id} is already cancelled`);
    }
    //2. Une copie miroir "annulée" est créée 
    const annulation = this.quittanceRepository.create({
      ...quittance,
      id: undefined,
      isAnnule: true,
      quittanceIdAnnule: id, // le id de référence
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const quittanceAnnulation= await this.quittanceRepository.save(annulation);
    quittance.isAnnule = true; // marque
    quittance.quittanceIdAnnule=quittanceAnnulation.id
    await this.quittanceRepository.save(quittance);

    // ============================================================
    // 3 : Annuler les Bordereaux (liés directement à la quittance)
    // ============================================================
    for (const bordereau of quittance.bordereaux || []) {
      await this.bordereauService.annuler(bordereau.id);
    }
    // ============================================================
    // 4 : Annuler les echeancesPmd (liés directement à la quittance)
    // ============================================================
    for (const pmd of quittance.echeancesPmd || []) {
      await this.echeancePmdService.annuler(pmd.id);
    }

    // ============================================================
    // 5 : Annuler les comptes (liés directement à la quittance)
    // ============================================================
    for (const compte of quittance.ComptesTraite || []) {
      await this.compteService.annuler(compte.id);
    }

    return quittanceAnnulation;
  }
  */
}