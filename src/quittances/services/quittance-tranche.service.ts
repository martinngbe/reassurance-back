// quittanceTranche.service.ts
import {  Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from 'src/common/crud/crud.service';
import { Quittance } from '../entities/quittance.entity';
import { failure } from 'src/common/helper/response.helper';
import { LogMethod } from 'src/common/decorateur/log-method.decorator';
import { QuittanceTranche } from '../entities/quittance-tranche.entity';
import { CreateQuittanceTrancheDto } from '../dto/create-quittance-tranche.dto';
import { UpdateQuittanceTrancheDto } from '../dto/update-quittance-tranche.dto';
import Decimal from 'decimal.js';

@Injectable()
export class QuittanceTrancheService extends CrudService<QuittanceTranche> {
  constructor(
    @InjectRepository(QuittanceTranche)
    private readonly  quittanceTrancheRepository: Repository<QuittanceTranche>,
    @InjectRepository(Quittance)
    private readonly quittanceRepository: Repository<Quittance>,
  ) {
    super(quittanceTrancheRepository);
  }

// ── CRÉATION : on calcule AVANT de persister ──────────────

@LogMethod()
async create(dto: CreateQuittanceTrancheDto): Promise<QuittanceTranche> {
  /////////////////////////////////////////////////////////////
  ////   Process de numérotation de la QuittanceTranche
  /////////////////////////////////////////////////////////////
  // 1. Validation : quittanceId obligatoire
  if (!dto.quittanceId) {
    throw new NotFoundException(failure('Le champ quittanceId est obligatoire'));
  }
  // 2. Charger la Quittance avec sa Police (relation eager)
  const quittance = await this.quittanceRepository.findOne({
    where: { id: dto.quittanceId },
    relations: { quittanceTranches: true },
    loadEagerRelations: false,
  });

  if (!quittance) {
      throw new NotFoundException(failure(`Quittance ${dto.quittanceId} introuvable`));
  }
  const nombreTranches = quittance.nombreTranche
  if (quittance.quittanceTranches.length>=nombreTranches) {
        throw new NotFoundException(failure(
          `Le Nombre de tranche de la quittance: ${dto.quittanceId} a été atteint .`),
        );
  }

   
  /////////////////////////////////////////////////////////////
  ////    FIN
  /////////////////////////////////////////////////////////////

  // 👇 Conversion explicite en Decimal
  const estimationPrime = new Decimal(dto.estimationPrime ?? 0);
  const tauxPrime       = new Decimal(dto.tauxPrime ?? 0);
  
  dto.primeTranche = estimationPrime.mul(tauxPrime.dividedBy(100));

  const data = { ...(dto as any) };
   // 3. Persistance
  return super.create(data); // ← utilise la méthode parente
}





  // ── MISE À JOUR
  async update(id: number, dto: UpdateQuittanceTrancheDto): Promise<QuittanceTranche> {
    const quittanceTranche = await this.quittanceTrancheRepository.findOneOrFail({ where: { id } });
  
  if (dto.tauxPrime && dto.estimationPrime) {
    // 👇 Conversion explicite en Decimal (comme dans le create)
    const estimationPrime = new Decimal(dto.estimationPrime);
    const tauxPrime = new Decimal(dto.tauxPrime);
    
    dto.primeTranche = estimationPrime.mul(tauxPrime.dividedBy(100));
  }    // 2. Mise à jour + recalcul
    Object.assign(quittanceTranche, dto);
    //Object.assign(quittanceTranche, this.calculService.appliquer(quittanceTranche));

    return this.quittanceTrancheRepository.save(quittanceTranche);
  }




     

}