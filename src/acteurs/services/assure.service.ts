import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CrudService } from '../../common/crud/crud.service';
import { Assure } from '../entities/assure.entity';
import { UpdateAssureDto } from '../dto/update-assure.dto';
import { failure } from 'src/common/helper/response.helper';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class AssureService extends CrudService<Assure> {
  constructor(
    @InjectRepository(Assure) repository: Repository<Assure>,
    private readonly cls: ClsService,
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
}