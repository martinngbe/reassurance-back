import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CrudService } from '../../common/crud/crud.service';
import { Bordereau } from '../entities/bordereau.entity';
import { Quittance } from 'src/quittances/entities/quittance.entity';
import { Transactional, TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterTypeOrm } from '@nestjs-cls/transactional-adapter-typeorm';
import { SeriesService } from 'src/series/series.service';
import { EntityType } from 'src/series/enums/series.enums';
import { buildContextFromFlags } from 'src/series/utils/series-builder.util';
import { LogMethod } from 'src/common/decorateur/log-method.decorator';
import { failure } from 'src/common/helper/response.helper';

@Injectable()
export class BordereauService extends CrudService<Bordereau> {
  constructor(
    @InjectRepository(Bordereau) repository: Repository<Bordereau>,
    private readonly txHost: TransactionHost<TransactionalAdapterTypeOrm>,
    private readonly seriesService: SeriesService,
  ) {
    super(repository);
  }

  /**
   * Surchage de create : génère automatiquement le numéro métier
   * en fonction du type de Police parente (via Quittance).
   *
   * @param dto Doit contenir `quittanceId` (obligatoire)
   */
  @Transactional()
  @LogMethod()
  async create(dto: DeepPartial<Bordereau>): Promise<Bordereau> {
    const tx = this.txHost.tx;

    // 1. Validation : quittanceId obligatoire
    if (!dto.quittanceId) {
      throw new NotFoundException('Le champ quittanceId est obligatoire');
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
      EntityType.BORDEREAU,
      serieContext,
    );

    // 5. Appel au create parent avec le numéro injecté
    return super.create({
      ...dto,
      numero, // ✅ injecté en dernier pour ne pas être écrasé
    });
  }
}


