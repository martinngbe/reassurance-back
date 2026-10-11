import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { PaginationParams, IResponse, OPERATION_SUCCES, OPERATION_ECHEC } from 'src/common/crud/crud.service';
import { CompteTraiteDetail } from '../entities/compte-traite-detail.entity';

@Injectable()
export class CompteTraiteDetailService {
  constructor(
    @InjectRepository(CompteTraiteDetail)
    private compteTraiteDetailRepository: Repository<CompteTraiteDetail>,
  ) {}

 
    /**
     * Récupère les entités avec pagination.
     * @param pagination Objet contenant page et limit
     * @param options Options TypeORM classiques (where, relations, order...)
     */
  async findAll(
    pagination: PaginationParams = {},
    options: FindManyOptions<CompteTraiteDetail> = {},
    ): Promise<IResponse> {
    const page = pagination.page && pagination.page > 0 ? pagination.page : 1;
    const limit = pagination.limit && pagination.limit > 0 ? pagination.limit : 10;
    const skip = (page - 1) * limit;

    const [data, total] = await this.compteTraiteDetailRepository.findAndCount({
      ...options,
      skip,
      take: limit,
      order: {
      createdAt: 'DESC',
    },
    });

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
 async  findOne(id: number): Promise<IResponse> {
    const compteTraiteDetail = await  this.compteTraiteDetailRepository.findOneOrFail({
      where: { id } });
    if(!compteTraiteDetail)  
      return {
        success:false,
        message: `CompteTraiteDetail N° ${id} est introuvable`
    }
     return {
        success:true,
        data:compteTraiteDetail,
        message: OPERATION_SUCCES
    }
  }


  async create(compteTraiteDetail: Partial<CompteTraiteDetail>): Promise<IResponse> {
    const newEval = this.compteTraiteDetailRepository.create(compteTraiteDetail);
    const save = await this.compteTraiteDetailRepository.save(newEval);
    if(!save) return{
      success:false,
      message:OPERATION_ECHEC
    }
    return {
      success:true,
      data:save,
      message:OPERATION_SUCCES
    }
  }

  async update(id: number, compteTraiteDetail: Partial<CompteTraiteDetail>): Promise<IResponse> {
    const existing = await this.findOne(id);
    if (!existing.success)  return existing;
      //throw new NotFoundException(`CompteTraiteDetail ${id} not found`);
    Object.assign(existing.data, compteTraiteDetail);
    const save = await this.compteTraiteDetailRepository.save(existing.data);
    return {
      success:true,
      data: save,
      message:OPERATION_SUCCES
    }
  }

  async remove(id: number): Promise<void> {
    await this.compteTraiteDetailRepository.delete(id);
    //const result = await this.compteTraiteDetailRepository.delete(id);
   // if (result.affected === 0) throw new NotFoundException(`CompteTraiteDetail ${id} not found`);
  }
}