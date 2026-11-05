// echeance-pmd.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from '../../common/crud/crud.service';
import { EcheancePmd } from '../entities/echeance-pmd.entity';
import { Quittance } from 'src/quittances/entities/quittance.entity';
import Decimal from 'decimal.js';
import { failure } from 'src/common/helper/response.helper';

@Injectable()
export class EcheancePmdService extends CrudService<EcheancePmd> {
  constructor(
    @InjectRepository(EcheancePmd) repository: Repository<EcheancePmd>,
    @InjectRepository(Quittance) private quittanceRepo: Repository<Quittance>,
  ) {
    super(repository);
  }

  // ✅ Surcharge de la création
  async create(data: any): Promise<EcheancePmd> {
    await this.validateBusinessRules(data.quittanceId, data.prime, null);
    return super.create(data);
  }

  // ✅ Surcharge de la modification
  async update(id: number, data: any): Promise<EcheancePmd> {
    await this.validateBusinessRules(data.quittanceId, data.prime, id);
    return super.update(id, data);
  }

  // ✅ Méthode de validation des règles métier
  private async validateBusinessRules(quittanceId: number, newPrime: Decimal | number | string, currentEcheanceId: number | null) {
    if (!quittanceId) {
      throw new BadRequestException(failure('L\'ID de la quittance est requis.'));
    }

    const quittance = await this.quittanceRepo.findOne({ where: { id: quittanceId } });
    if (!quittance) {
      throw new BadRequestException(failure('Quittance introuvable.'));
    }

    // Récupérer les échéances existantes pour cette quittance
    const existingEcheances = await this.repository.find({
      where: { quittance: { id: quittanceId } }
    });

    // 1. Validation du Nombre d'Échéances
    const isUpdate = currentEcheanceId !== null;
    const totalEcheances = isUpdate ? existingEcheances.length : existingEcheances.length + 1;
    
    // ⚠️ Adaptez 'nombreEcheances' selon le nom exact de la propriété dans votre entité Quittance
    const maxEcheances = (quittance as any).nombreEcheancePmd ?? 0; 
    if (totalEcheances > maxEcheances) {
      throw new BadRequestException( failure(
        `Le nombre d'échéances ne peut pas dépasser ${maxEcheances}.`));
    }

    // 2. Validation du Cumul des Primes
    let sumPrime = new Decimal(0);
    for (const e of existingEcheances) {
      if (isUpdate && e.id === currentEcheanceId) continue; // Ignorer l'échéance en cours de modification
      sumPrime = sumPrime.plus(e.prime || 0);
    }
    sumPrime = sumPrime.plus(newPrime || 0);

    // ⚠️ Adaptez 'estimationPrime' selon le nom exact de la propriété dans votre entité Quittance
    const maxPrime = new Decimal((quittance as any).estimationPrime ?? 0);
    if (sumPrime.greaterThan(maxPrime)) {
      throw new BadRequestException(failure(`Le cumul des primes (${sumPrime.toFixed(2)}) dépasse l'estimation de prime (${maxPrime.toFixed(2)}).`));
    }
  }
}