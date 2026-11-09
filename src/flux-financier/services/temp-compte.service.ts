import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CrudService } from '../../common/crud/crud.service';
import { TempCompte } from '../entities/temp-compte.entity';
import { CompteDetail } from '../entities/compte-detail.entity';
import { Compte } from '../entities/compte.entity';
import { failure } from 'src/common/helper/response.helper';
import { ClsService } from 'nestjs-cls'; // ✅ Ajout

@Injectable()
export class TempCompteService extends CrudService<TempCompte> {
  constructor(
    @InjectRepository(TempCompte) repository: Repository<TempCompte>,
    @InjectRepository(Compte)
    private readonly compteRepo: Repository<Compte>,
    @InjectRepository(CompteDetail)
    private readonly compteDetailRepo: Repository<CompteDetail>,
    private readonly dataSource: DataSource,
    private readonly cls: ClsService, // ✅ Injection
  ) {
    super(repository);
  }

  async transfererTempCompteVersCompte(tempCompteId: number): Promise<Compte> {
    // ✅ Récupérer le userId AVANT la transaction
    const userId = this.cls.isActive() ? (this.cls.get('userId') ?? null) : null;

    return await this.dataSource.transaction(async (manager) => {
      const tempCompte = await manager.findOne(TempCompte, {
        where: { id: tempCompteId },
        relations: ['compteDetails'],
      });
      if (!tempCompte) {
        throw new NotFoundException(failure(`Le TempCompte avec l'ID ${tempCompteId} est introuvable.`));
      }

      // 2. Créer et sauvegarder le nouveau Compte
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
      });
      
      // ✅ Injecter manuellement createdBy et updatedBy
      if (userId) {
        nouveauCompte.createdBy = userId;
        nouveauCompte.updatedBy = userId;
      }
      
      const compteSauvegarde = await manager.save(nouveauCompte);

      // 3. Transférer les TempCompteDetail vers CompteDetail
      if (tempCompte.compteDetails && tempCompte.compteDetails.length > 0) {
        const nouveauxDetails = tempCompte.compteDetails.map((tempDetail) => {
          const newDetail = this.compteDetailRepo.create({
            deviseId: tempDetail.deviseId,
            coursDevise: tempDetail.coursDevise,
            debit: tempDetail.debit,
            credit: tempDetail.credit,
            isAnnule: tempDetail.isAnnule,
            compteTratieDetailIdAnnule: tempDetail.compteTratieDetailIdAnnule,
            compteRubriqueId: tempDetail.compteRubriqueId,
            compteId: compteSauvegarde.id,
          });
          
          // ✅ Injecter manuellement createdBy et updatedBy
          if (userId) {
            newDetail.createdBy = userId;
            newDetail.updatedBy = userId;
          }
          
          return newDetail;
        });
        await manager.save(nouveauxDetails);
      }

      // 4. Supprimer le TempCompte original
      await manager.remove(tempCompte);

      // 5. Retourner le Compte final
      return await manager.findOneOrFail(Compte, {
        where: { id: compteSauvegarde.id },
        relations: ['compteDetails', 'quittance', 'quittancePlacement', 'compteType'],
      });
    });
  }
}