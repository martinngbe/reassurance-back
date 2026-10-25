import { NotFoundException } from '@nestjs/common';
import {
  DeepPartial,
  FindManyOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { PaginationParams, PaginatedResult } from '../interfaces/response.interface';
import { failure } from '../helper/response.helper';
import { Role } from 'src/auth/entities/role.entity';
import { LogMethod } from '../decorateur/log-method.decorator';


/**
 * Service CRUD générique.
 * Retourne des entités brutes ou lève des exceptions NestJS.
 */
export abstract class CrudService<T extends { id: number }> {
  protected constructor(protected readonly repository: Repository<T>) {}

  /**
   * Récupère toutes les entités (sans pagination).
   * Utile pour les dropdowns, selects, etc.
   */
  @LogMethod()
  findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  /**
   * Récupère les entités avec pagination.
   */
  @LogMethod()
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
      pageInfo:{ 
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
      }
     
    };
  }

  /**
   * Récupère une entité par son ID.
   */
  @LogMethod()
  async findOne(id: number, options?: FindManyOptions<T>): Promise<T> {
    const entity = await this.repository.findOne({
      where: { id } as unknown as FindOptionsWhere<T>,
      ...options,
    });

    if (!entity) {
      throw new NotFoundException(
        failure(`${this.repository.metadata.name} #${id} introuvable`)
      );
    }
    return entity;
  }
  
  /**
   * Crée une nouvelle entité.
   */
   @LogMethod()
  async create(dto: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(dto);
    return this.repository.save(entity);
  }

  /**
   * Met à jour une entité existante.
   */ 

    /**
   * Met à jour une entité existante.
   */
  @LogMethod()
  async update(id: number, dto: DeepPartial<T>): Promise<T> {
    const entity = await this.repository.findOne({
      where: { id } as FindOptionsWhere<T>
    });

    if (!entity) {
      throw new NotFoundException(failure(`Entity with id ${id} not found`));
    }

    // 🚨 FIX CRUCIAL : Supprimer les relations chargées (ex: eager: true) de l'entité.
    // Sinon, TypeORM donne la priorité à l'objet relation (ex: sousBranche: {id: 11}) 
    // par rapport à la clé étrangère (ex: sousBrancheId: 14) lors du save(), 
    // ce qui empêche la mise à jour de la FK en base.
    this.repository.metadata.relations.forEach(relation => {
      delete entity[relation.propertyName];
    });

    const merged = this.repository.merge(entity, dto);
    return this.repository.save(merged);
  }

  /**
   * Supprime une entité.
   */
   @LogMethod()
  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    await this.repository.remove(entity);
  }
}