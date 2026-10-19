import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CrudService } from '../../common/crud/crud.service';
import { Assure } from '../entities/assure.entity';
import { UpdateAssureDto } from '../dto/update-assure.dto';
import { failure } from 'src/common/helper/response.helper';

@Injectable()
export class AssureService extends CrudService<Assure> {
  constructor(@InjectRepository(Assure) repository: Repository<Assure>) {
    super(repository);
  }



  /**
   * Surcharge de la méthode update pour gérer correctement les clés étrangères.
   * Utilise repository.update() pour éviter les conflits de relations en mémoire de TypeORM.
   */
  async update(id: number, dto: DeepPartial<Assure> | UpdateAssureDto): Promise<Assure> {
   
   
    console.log("________________________________");
    console.log("AssureService.update");
    console.log("id:", id);
    console.log("dto:", dto);
    console.log("________________________________");   
    // 1. Vérifier que l'entité existe
    const existingEntity = await this.repository.findOne({ where: { id } });
    if (!existingEntity) {
      throw new NotFoundException( failure(`Assuré #${id} introuvable`));
    }
    console.log("existingEntity:", existingEntity);
    // 2. Mise à jour directe et atomique en base de données
    // Cela force MariaDB à mettre à jour les colonnes paysId et domaineActiviteId
    // sans se soucier des objets relations chargés en mémoire.
    const resultUpdated=    await this.repository.update(id, dto);
    console.log("resultUpdated:", resultUpdated);
    // 3. Recharger l'entité avec ses relations à jour pour la retourner au frontend
    const updatedEntity = await this.repository.findOne({
      where: { id },
      relations: ['pays', 'domaineActivite'], // Assurez-vous que ces relations sont bien définies dans votre entité
    });
    console.log("updatedEntity:", updatedEntity);
    if (!updatedEntity) {
      throw new NotFoundException( failure(`Assuré #${id} introuvable après mise à jour`) );
    }

    return updatedEntity as Assure;
  }

}
