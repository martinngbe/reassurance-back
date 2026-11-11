import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterTypeOrm } from '@nestjs-cls/transactional-adapter-typeorm';
import { SeriesCounter } from './entities/series-counter.entity';
import { SeriesConfig } from './interfaces/series-config.interface';
import { buildSeriesConfig } from './utils/series-builder.util';
import { EntityType } from './enums/series.enums';
import { SeriesContext } from './interfaces/series-config.interface';

@Injectable()
export class SeriesService {
  private readonly logger = new Logger(SeriesService.name);

  constructor(
    private readonly txHost: TransactionHost<TransactionalAdapterTypeOrm>,
  ) {}

  /**
   * Retourne le prochain numéro d'une série, de façon atomique.
   *
   * ⚠️ S'exécute DANS la transaction courante (CLS) si elle existe.
   *    → un rollback du métier annule aussi la consommation du numéro (aucun trou).
   *    → si aucune transaction n'est active, withTransaction() en ouvre une.
   *
   * @param config  Résultat de buildSeriesConfig(...)
   * @param year    Année de rattachement (défaut : année courante)
   */
  async getNextNumber(
    config: SeriesConfig,
    year: number = new Date().getFullYear(),
  ): Promise<string> {
    return this.txHost.withTransaction(async () => {
      const tx = this.txHost.tx;
      const repo = tx.getRepository(SeriesCounter);

      // 1. Création à la volée de la série si elle n'existe pas (ex: 1er janvier)
      //    orIgnore() => INSERT IGNORE : inoffensif si la ligne existe déjà.
      await repo
        .createQueryBuilder()
        .insert()
        .into(SeriesCounter)
        .values({
          seriesKey: config.seriesKey,
          prefix: config.prefix,
          paddingLength: config.paddingLength,
          currentValue: 0,
        })
        .orIgnore()// orIgnore() => INSERT IGNORE : inoffensif si la ligne existe déjà.
        .execute();

      // 2. Lecture avec verrou exclusif (SELECT ... FOR UPDATE)
      const counter = await repo.findOne({
        where: { seriesKey: config.seriesKey },
        lock: { mode: 'pessimistic_write' },
      });

      if (!counter) {
        throw new InternalServerErrorException(
          `Impossible d'initialiser la série ${config.seriesKey}`,
        );
      }

      // 3. Incrémentation (BIGINT => string côté driver, on cast)
      const nextValue = Number(counter.currentValue) + 1;

      await repo.update(
        { seriesKey: config.seriesKey },
        { currentValue: nextValue },
      );

      // 4. Formatage : PAF-26-00001
      const shortYear = String(year).slice(-2);
      const padded = String(nextValue).padStart(counter.paddingLength, '0');
      const numero = `${counter.prefix}-${shortYear}-${padded}`;

      this.logger.debug(`Série ${config.seriesKey} → ${numero}`);
      return numero;
    });
  }

  /**
   * Raccourci : build + génération en un appel.
   */
  async nextNumero(
    entityType: EntityType,
    context: SeriesContext,
    year?: number,
  ): Promise<string> {
    const config = buildSeriesConfig(entityType, context);
    return this.getNextNumber(config, year);
  }
}