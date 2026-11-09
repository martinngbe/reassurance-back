import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { 
  CrudService, 
} from '../../common/crud/crud.service';
import { TempCompte } from '../entities/temp-compte.entity';
import { CompteDetail } from '../entities/compte-detail.entity';
import { Compte } from '../entities/compte.entity';
import { failure } from 'src/common/helper/response.helper';

@Injectable()
export class TempCompteService extends CrudService<TempCompte> {
  constructor(
    @InjectRepository(TempCompte) repository: Repository<TempCompte>,
    @InjectRepository(Compte)
    private readonly compteRepo: Repository<Compte>,
    @InjectRepository(CompteDetail)
    private readonly compteDetailRepo: Repository<CompteDetail>,
    private readonly dataSource: DataSource, // Utilisé pour les transactions
  ) {
    super(repository);
  }
 



   /**
   * Transfère un TempCompte et ses détails vers un Compte définitif.
   * @param tempCompteId L'ID du TempCompte à transférer
   * @returns Le nouveau Compte créé avec ses détails
   */
  async transfererTempCompteVersCompte(tempCompteId: number): Promise<Compte> {
    
    // Utilisation d'une transaction pour l'intégrité des données
    return await this.dataSource.transaction(async (manager) => {
      
      // 1. Récupérer le TempCompte avec ses lignes de détails
      const tempCompte = await manager.findOne(TempCompte, {
        where: { id: tempCompteId },
        relations: ['compteDetails'],
      });

      if (!tempCompte) {
        throw new NotFoundException(failure( `Le TempCompte avec l'ID ${tempCompteId} est introuvable.`));
      }

      // 2. Créer et sauvegarder le nouveau Compte
      // Note : coursDevise et solde sont des objets Decimal dans TempCompte, 
      // mais des numbers dans Compte. On utilise .toNumber() pour la conversion.
      const nouveauCompte = this.compteRepo.create({
        deviseId: tempCompte.deviseId,
        coursDevise: tempCompte.coursDevise.toNumber(), 
        solde: tempCompte.solde.toNumber(),
        isEnNotreFaveur: tempCompte.isEnNotreFaveur,
        isAnnule: tempCompte.isAnnule,
        compteIdAnnule: tempCompte.compteIdAnnule,
        quittanceId: tempCompte.quittanceId,
        quittancePlacementId: tempCompte.quittancePlacementId,
        compteTypeId: tempCompte.compteTypeId,
        // Le champ 'numero' n'existe pas dans TempCompte, il restera null ou prendra sa valeur par défaut
      });

      const compteSauvegarde = await manager.save(nouveauCompte);

      // 3. Transférer les TempCompteDetail vers CompteDetail
      if (tempCompte.compteDetails && tempCompte.compteDetails.length > 0) {
        const nouveauxDetails = tempCompte.compteDetails.map((tempDetail) => {
          return this.compteDetailRepo.create({
            deviseId: tempDetail.deviseId,
            coursDevise: tempDetail.coursDevise, // Reste en Decimal (utilise le DecimalTransformer)
            debit: tempDetail.debit,             // Reste en Decimal
            credit: tempDetail.credit,           // Reste en Decimal
            isAnnule: tempDetail.isAnnule,
            compteTratieDetailIdAnnule: tempDetail.compteTratieDetailIdAnnule,
            compteRubriqueId: tempDetail.compteRubriqueId,
            compteId: compteSauvegarde.id, // Liaison au nouveau Compte créé
          });
        });

        await manager.save(nouveauxDetails);
      }

      // 4. Supprimer le TempCompte original
      // Grâce à onDelete: 'CASCADE' sur TempCompteDetail, les détails seront supprimés automatiquement en base.
      await manager.remove(tempCompte);

      // 5. Retourner le Compte final avec ses relations chargées
      return await manager.findOneOrFail(Compte, {
        where: { id: compteSauvegarde.id },
        relations: ['compteDetails', 'quittance', 'quittancePlacement', 'compteType'],
      });
    });
  }

}