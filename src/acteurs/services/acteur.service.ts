import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CrudService } from '../../common/crud/crud.service';
import { failure } from 'src/common/helper/response.helper';
import { ClsService } from 'nestjs-cls';
import { UpdateActeurDto } from '../dto/update-acteur.dto';
import { Acteur } from '../entities/acteur.entity';

@Injectable()
export class ActeurService extends CrudService<Acteur> {
  constructor(
    @InjectRepository(Acteur) repository: Repository<Acteur>
  ) {
    super(repository);
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