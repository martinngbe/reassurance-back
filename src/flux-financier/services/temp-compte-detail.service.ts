import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { CrudService } from '../../common/crud/crud.service';
import { TempCompteDetail } from '../entities/temp-compte-detail.entity';
import { CompteRubrique } from '../entities/compte-rubrique.entity';
import { PaginatedResult } from 'src/common/interfaces/response.interface';
import Decimal from 'decimal.js';
import { TempCompte } from '../entities/temp-compte.entity';
import { failure } from 'src/common/helper/response.helper';

@Injectable()
export class TempCompteDetailService extends CrudService<TempCompteDetail> {
  constructor(
    @InjectRepository(TempCompteDetail) repository: Repository<TempCompteDetail>,
    @InjectRepository(CompteRubrique)
    private readonly compteRubriqueRepository: Repository<CompteRubrique>,
    
    @InjectRepository(TempCompte) // ⬅️ Ajout de l'injection
    private readonly tempCompteRepository: Repository<TempCompte>,
    private readonly dataSource: DataSource, // ⬅️ Ajout pour les transactions
  ) {
    super(repository);
  }

  /**
   * Récupère toutes les rubriques avec leurs totaux (débit/crédit)
   * avec pagination, via un LEFT JOIN manuel.
   *
   * @param compteId          Filtre optionnel sur le compte
   * @param isProportionnelle Filtre optionnel sur le type de rubrique
   * @param page              Numéro de page (défaut 1)
   * @param limit             Nombre d'éléments par page (défaut 50)
   */
  async getRubriquesWithSoldes(
    compteId?: number,
    isProportionnelle?: string | null,
    isNonProportionnelle?: string | null,
    page = 1,
    limit = 50,
  ) : Promise<PaginatedResult<any>> {
    const skip = (page - 1) * limit;

      console.log(' ______________ tempCompteDetaiService.getRubriquesWithSoldes ______________')
      console.log('isProportionnelle:',isProportionnelle)      
      console.log('isNonProportionnelle:',isNonProportionnelle)
      console.log('compteId:',compteId)

    // 1. Construction de la requête de base
    const qb = this.compteRubriqueRepository.createQueryBuilder('rubrique')
      .leftJoin(
        TempCompteDetail,
        'detail',
        'detail.compte_rubrique_id = rubrique.id' +
          (compteId ? ' AND detail.compte_id = :compteId' : ''),
        { compteId },
      )
      .select([
        'rubrique.id AS compteRubriqueId',
        'detail.id AS compteDetailId',
        'rubrique.code AS code',
        'rubrique.libelle AS libelle',
        'rubrique.partie AS partie',
        'rubrique.numero_ordre AS numeroOrdre',
        'detail.debit AS debit',
        'detail.credit AS credit',
      ])
      .groupBy('rubrique.id')
      .orderBy('rubrique.numero_ordre', 'ASC')
      .orderBy('rubrique.libelle','ASC');
      

    // 2. Filtre dynamique sur is_proportionnel
    // if (isProportionnelle !== undefined && isProportionnelle !== null) {
    //   qb.andWhere('rubrique.is_proportionnelle = :isProportionnelle', {
    //     isProportionnelle,
    //   });
    // }
    if (isProportionnelle) {
        console.log(' _____ if (isProportionnelle) ',isProportionnelle)    
        qb.andWhere('rubrique.is_proportionnelle = 1');
    }
    if (isNonProportionnelle) {
        console.log(' _____ if (isNonProportionnelle) ',isNonProportionnelle)
        qb.andWhere('rubrique.is_non_proportionnelle = 1');
    }
    

    const sql = qb.getSql();
    console.log('Requête SQL :', sql);

    // Ou, pour voir la requête et les valeurs des paramètres
    const [query, parameters] = qb.getQueryAndParameters();
    console.log('Requête :', query);
    console.log('Paramètres :', parameters);



    // 3. Récupération du total (avec le même filtre appliqué)
    const total = await qb.getCount();

    // 4. Pagination
    const data = await qb.skip(skip).take(limit).getRawMany();

    // 5. Format de réponse standardisé
    return {
      data,
      pageInfo: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }



  /**
   * Méthode privée : Recalcule le solde d'un TempCompte à partir de ses détails actifs.
   * Factorisée pour être réutilisée par create, update et annuler.
   */
  private async recalculerSoldeCompte(
    manager: EntityManager,
    compteId: number,
  ): Promise<void> {
    const sumResult = await manager
      .createQueryBuilder(TempCompteDetail, 'detail')
      .select('SUM(detail.debit)', 'totalDebit')
      .addSelect('SUM(detail.credit)', 'totalCredit')
      .where('detail.compteId = :compteId', { compteId })
      .andWhere('detail.isAnnule = :isAnnule', { isAnnule: false })
      .getRawOne();

    const totalDebit = new Decimal(sumResult?.totalDebit || 0);
    const totalCredit = new Decimal(sumResult?.totalCredit || 0);
    const nouveauSolde = totalDebit.minus(totalCredit);

    await manager.update(TempCompte, compteId, {
      solde: nouveauSolde,
      isEnNotreFaveur: nouveauSolde.greaterThanOrEqualTo(0),
    });
  }

   /**
   * Crée ou met à jour un détail avec recalcul automatique du solde.
   */
  async saveDetailAndUpdateSolde(data: Partial<TempCompteDetail>): Promise<TempCompteDetail> {
    const debit = data.debit ? new Decimal(data.debit) : new Decimal(0);
    const credit = data.credit ? new Decimal(data.credit) : new Decimal(0);

    if (debit.isZero() && credit.isZero()) {
      throw new BadRequestException(failure(
        "L'enregistrement est ignoré : le débit et le crédit sont tous deux à 0."),
      );
    }

    return await this.dataSource.transaction(async (manager) => {
      let detail: TempCompteDetail;

      if (data.id) {
        await manager.update(TempCompteDetail, data.id, { ...data, debit, credit });
        detail = await manager.findOneOrFail(TempCompteDetail, { where: { id: data.id } });
      } else {
        const newDetail = manager.create(TempCompteDetail, { ...data, debit, credit });
        detail = await manager.save(newDetail);
      }

      await this.recalculerSoldeCompte(manager, detail.compteId);
      return detail;
    });
  }


 /**
   * Annule un détail (soft delete) et recalcule le solde du compte parent.
   * Conserve l'historique comptable (principe d'audit trail).
   */
  async annulerDetail(id: number): Promise<TempCompteDetail> {
    return await this.dataSource.transaction(async (manager) => {
      const detail = await manager.findOne(TempCompteDetail, { where: { id } });

      if (!detail) {
        throw new NotFoundException( failure(`Détail #${id} introuvable.`));
      }

      if (detail.isAnnule) {
        throw new BadRequestException(failure(`Le détail #${id} est déjà annulé.`));
      }

      // Soft delete : on marque comme annulé
      //await manager.update(TempCompteDetail, id, { isAnnule: true });
      await manager.delete(TempCompteDetail, id);

      // Recalcul du solde (les lignes annulées sont exclues automatiquement)
      await this.recalculerSoldeCompte(manager, detail.compteId);

      return { ...detail, isAnnule: true };
    });
  }



}