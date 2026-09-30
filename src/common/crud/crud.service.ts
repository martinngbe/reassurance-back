import { NotFoundException } from '@nestjs/common';
import {
  DeepPartial,
  FindManyOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

/**
 * Service CRUD générique réutilisé par les modules du domaine.
 * Chaque entité expose son propre service qui étend celui-ci afin
 * d'ajouter, si besoin, des règles métier spécifiques.
 */
export abstract class CrudService<T extends { id: number }> {
  protected constructor(protected readonly repository: Repository<T>) {}

  findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  async findOne(id: number): Promise<T> {
    const entity = await this.repository.findOne({
      where: { id } as unknown as FindOptionsWhere<T>,
    });
    if (!entity) {
      throw new NotFoundException(
        `${this.repository.metadata.name} #${id} introuvable`,
      );
    }
    return entity;
  }

  create(dto: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(dto);
    return this.repository.save(entity);
  }

  async update(id: number, dto: DeepPartial<T>): Promise<T> {
    const entity = await this.findOne(id);
    const merged = this.repository.merge(entity, dto);
    return this.repository.save(merged);
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    await this.repository.remove(entity);
  }
}
