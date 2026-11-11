import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CrudService } from '../../common/crud/crud.service';
import { failure } from 'src/common/helper/response.helper';
import { ClsService } from 'nestjs-cls';
import { UpdateActeurDto } from '../dto/update-acteur.dto';
import { Acteur } from '../entities/acteur.entity';
import { TransactionalAdapterTypeOrm } from '@nestjs-cls/transactional-adapter-typeorm';
import { Transactional, TransactionHost } from '@nestjs-cls/transactional';
import { SeriesService } from 'src/series/series.service';
import { LogMethod } from 'src/common/decorateur/log-method.decorator';
import { buildSeriesConfig, EntityType } from 'src/series';
import { Pays } from 'src/referentiel/entities/pays.entity';

@Injectable()
export class ActeurService extends CrudService<Acteur> {
  constructor(
    @InjectRepository(Acteur) repository: Repository<Acteur>,
        private readonly txHost: TransactionHost<TransactionalAdapterTypeOrm>,
        private readonly seriesService: SeriesService,
  ) {
    super(repository);
  }

  @Transactional()
  @LogMethod()
  async create(dto: DeepPartial<Acteur>): Promise<Acteur> {
    const tx = this.txHost.tx;

    // 1. Validation : quittanceId obligatoire
    if (!dto.paysId) {
      throw new NotFoundException('Le champ paysId est obligatoire');
    }

    // 2. Charger la Quittance avec sa Police (relation eager)
    const pays = await tx.getRepository(Pays).findOne({
      where: { id: dto.paysId },
      // relations: { police: true },
      // loadEagerRelations: false,
    });

    if (!pays) {
      throw new NotFoundException(failure(`Pays ${dto.paysId} introuvable`));
    }

   

    // 3. Déduire le contexte depuis la Police parente
    const serieContext = buildSeriesConfig(
      EntityType.ACTEUR,
      { paysCode: pays.code }
    );

    // 4. Générer le numéro de Bordereau (BAF-26-00001 / BAT / BCF / BCT)
    const numero = await this.seriesService.getNextNumber(    
      serieContext,
    );

    // 5. Appel au create parent avec le numéro injecté
    return super.create({
      ...dto,
      numero, // ✅ injecté en dernier pour ne pas être écrasé
    });
  }


async update(id: number, dto: DeepPartial<Acteur> | UpdateActeurDto): Promise<Acteur> {
  // Vérifier que l'entité existe
  const existingEntity = await this.repository.findOne({ where: { id } });
  if (!existingEntity) {
    throw new NotFoundException(failure(`Acteur #${id} introuvable`));
  }

  // Appeler le parent et recharger avec les relations
  await super.update(id, dto as DeepPartial<Acteur>);
  
  return await this.repository.findOne({
    where: { id },
    relations: ['pays'],
  }) as Acteur;
}
}