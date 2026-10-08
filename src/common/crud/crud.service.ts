import { NotFoundException } from '@nestjs/common';
import {
  DeepPartial,
  FindManyOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

// --- Interfaces pour la pagination ---
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export abstract class CrudService<T extends { id: number }> {
  protected constructor(protected readonly repository: Repository<T>) {}


  findAll(options?: FindManyOptions<T>): Promise<T[]> {
  return this.repository.find(options);
}
  /**
   * Récupère les entités avec pagination.
   * @param pagination Objet contenant page et limit
   * @param options Options TypeORM classiques (where, relations, order...)
   */
 async findAllPaginated(
  pagination: PaginationParams = {},
  options: FindManyOptions<T> = {},
  ): Promise<PaginatedResult<T>> {
  const page = pagination.page && pagination.page > 0 ? pagination.page : 1;
  const limit = pagination.limit && pagination.limit > 0 ? pagination.limit : 10;
  const skip = (page - 1) * limit;

  const [data, total] = await this.repository.findAndCount({
    ...options,
    skip,
    take: limit,
  });

  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
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