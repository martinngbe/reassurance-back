import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
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
   * Crée ou met à jour un détail de compte et recalcule le solde du compte parent.
   * Règle métier : Si debit = 0 et credit = 0, aucun enregistrement n'est effectué.
   * 
   * @param data Les données du détail (avec ou sans 'id' pour différencier create/update)
   */
  async saveDetailAndUpdateSolde(data: Partial<TempCompteDetail>): Promise<TempCompteDetail> {
    const debit = data.debit ? new Decimal(data.debit) : new Decimal(0);
    const credit = data.credit ? new Decimal(data.credit) : new Decimal(0);
    console.log(' _________ TempCompteDetailService.saveDetailAndUpdateSolde ')
    console.log(' data: ',data)
    console.log(' debit: ',debit)
    console.log(' credit: ',credit)
    // 1. Vérification de la règle métier
    if (debit.isZero() && credit.isZero()) {
      throw new BadRequestException(failure(
        "L'enregistrement est ignoré : le débit et le crédit sont tous deux à 0.")
      );
      // Note : Si vous préférez ne pas lever d'erreur, remplacez par : return null;
    }

    // 2. Transaction pour garantir l'intégrité des données (Atomicité)
    return await this.dataSource.transaction(async (manager) => {
      let detail: TempCompteDetail;
      
      if (data.id) {
        // --- Mise à jour ---
         console.log(' --- Mise à jour data.id ',data.id)
        await manager.update(TempCompteDetail, data.id, { ...data, debit, credit });
        detail = await manager.findOneOrFail(TempCompteDetail, { where: { id: data.id } });
      } else {
        // --- Création ---
        console.log(' --- Création ',data)
        const newDetail = manager.create(TempCompteDetail, { ...data, debit, credit });
        console.log(' --- newDetail ',newDetail)
        detail = await manager.save(newDetail);
      }

      // 3. Recalcul du solde du TempCompte associé
      const compteId = detail.compteId;
      
      const sumResult = await manager
        .createQueryBuilder(TempCompteDetail, 'detail')
        .select('SUM(detail.debit)', 'totalDebit')
        .addSelect('SUM(detail.credit)', 'totalCredit')
        .where('detail.compteId = :compteId', { compteId })
        .andWhere('detail.isAnnule = :isAnnule', { isAnnule: false }) // Exclusion des lignes annulées
        .getRawOne();

      const totalDebit = new Decimal(sumResult?.totalDebit || 0);
      const totalCredit = new Decimal(sumResult?.totalCredit || 0);
      
      // Formule demandée : Somme des débits - Somme des crédits
      const nouveauSolde = totalDebit.minus(totalCredit);

      // 4. Mise à jour du TempCompte
      await manager.update(TempCompte, compteId, {
        solde: nouveauSolde,
        isEnNotreFaveur: nouveauSolde.greaterThanOrEqualTo(0), // Mise à jour logique du statut
      });

      return detail;
    });
  }

}