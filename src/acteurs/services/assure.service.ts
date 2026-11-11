import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CrudService } from '../../common/crud/crud.service';
import { Assure } from '../entities/assure.entity';
import { UpdateAssureDto } from '../dto/update-assure.dto';
import { failure } from 'src/common/helper/response.helper';
import { ClsService } from 'nestjs-cls';
import { Transactional, TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterTypeOrm } from '@nestjs-cls/transactional-adapter-typeorm';
import { SeriesService } from 'src/series/series.service';
import { LogMethod } from 'src/common/decorateur/log-method.decorator';
import { Pays } from 'src/referentiel/entities/pays.entity';
import { buildContextFromFlags, buildSeriesConfig, EntityType } from 'src/series';

@Injectable()
export class AssureService extends CrudService<Assure> {
  constructor(
    @InjectRepository(Assure) repository: Repository<Assure>,
    private readonly cls: ClsService,
    private readonly txHost: TransactionHost<TransactionalAdapterTypeOrm>,
    private readonly seriesService: SeriesService,
  ) {
    super(repository);
  }

 async update(id: number, dto: DeepPartial<Assure> | UpdateAssureDto): Promise<Assure> {
  // Vérifier que l'entité existe
  const existingEntity = await this.repository.findOne({ where: { id } });
  if (!existingEntity) {
    throw new NotFoundException(failure(`Assure #${id} introuvable`));
  }

  // Appeler le parent et recharger avec les relations
  await super.update(id, dto as DeepPartial<Assure>);
  
  return await this.repository.findOne({
    where: { id },
    relations: ['pays', 'domaineActivite'],
  }) as Assure;
}


  @Transactional()
  @LogMethod()
  async create(dto: DeepPartial<Assure>): Promise<Assure> {
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
      EntityType.ASSURE,
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

}