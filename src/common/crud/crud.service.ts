import { NotFoundException } from '@nestjs/common';
import {
  DeepPartial,
  FindManyOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

// --- Interfaces pour la pagination ---

export const OPERATION_SUCCES ="Opération effectuée avec succès";
export const OPERATION_ECHEC ="Opération a effectué";
// --- Interfaces pour la pagination ---
export interface PaginationParams {
  page?: number;
  limit?: number;
}

// export interface PaginatedResult<T> {
//   data: T[];
//   total: number;
//   page: number;
//   limit: number;
//   totalPages: number;
// }
export interface IPageInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
export interface IResponse {
  success: boolean;
  message? : string 
  data?: any;
  pageInfo?: IPageInfo;
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
  ): Promise<IResponse> {
  const page = pagination.page && pagination.page > 0 ? pagination.page : 1;
  const limit = pagination.limit && pagination.limit > 0 ? pagination.limit : 10;
  const skip = (page - 1) * limit;

  const [data, total] = await this.repository.findAndCount({
    ...options,
    skip,
    take: limit,
  });
 // console.log("_______CrudService.findAllPaginated_______")
 // console.log("data:",data,"total:",total)
  return {
    success: true,
    data,
    pageInfo: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      }
  } ;
}


  async findOne(id: number): Promise<IResponse> {
    const entity = await this.repository.findOne({
      where: { id } as unknown as FindOptionsWhere<T>,
    });
    if (!entity) {
       return {
          success: false , 
          message: `${this.repository.metadata.name} #${id} introuvable`
        }
    }
    return {
      success: true,
      data :entity,
      message: `$succes`
    };
  }

  async create(dto: DeepPartial<T>): Promise<IResponse> {
    const entity = this.repository.create(dto);
    const save = this.repository.save(entity);
   // return this.repository.save(entity);
   if(!save)
    return {
      success: false,
      data :this.repository.save(entity),
      message: ` Echec création ${this.repository.metadata.name} `,
    }; 
    return {
      success: true,
      data :save,
      message: OPERATION_SUCCES
    };
  }

  async update(id: number, dto: DeepPartial<T>): Promise<IResponse> {
    const result = await this.findOne(id);
    if(!result.success) return result;
    const merged = this.repository.merge(result.data, dto);
    const save = this.repository.save(merged);
    if(!save) return {
      success: false,
      message: OPERATION_ECHEC
    }
    return {
      success: true,
      data:save,
      message: OPERATION_SUCCES
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.findOne(id);
    if(!result.success) return ;
    await this.repository.remove(result.data);
  }
}