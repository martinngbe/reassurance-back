import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { PaginationParams, IResponse, OPERATION_SUCCES, OPERATION_ECHEC } from 'src/common/crud/crud.service';
import { ReglementDetail } from '../entities/reglement-detail.entity';

@Injectable()
export class ReglementDetailService {
  constructor(
    @InjectRepository(ReglementDetail)
    private reglementDetailRepository: Repository<ReglementDetail>,
  ) {}

 
    /**
     * Récupère les entités avec pagination.
     * @param pagination Objet contenant page et limit
     * @param options Options TypeORM classiques (where, relations, order...)
     */
  async findAll(
    pagination: PaginationParams = {},
    options: FindManyOptions<ReglementDetail> = {},
    ): Promise<IResponse> {
    const page = pagination.page && pagination.page > 0 ? pagination.page : 1;
    const limit = pagination.limit && pagination.limit > 0 ? pagination.limit : 10;
    const skip = (page - 1) * limit;

    const [data, total] = await this.reglementDetailRepository.findAndCount({
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
    const reglementDetail = await  this.reglementDetailRepository.findOneOrFail({
      where: { id } });
    if(!reglementDetail)  
      return {
        success:false,
        message: `ReglementDetail N° ${id} est introuvable`
    }
     return {
        success:true,
        data:reglementDetail,
        message: OPERATION_SUCCES
    }
  }


  async create(reglementDetail: Partial<ReglementDetail>): Promise<IResponse> {
    const newEval = this.reglementDetailRepository.create(reglementDetail);
    const save = await this.reglementDetailRepository.save(newEval);
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

  async update(id: number, reglementDetail: Partial<ReglementDetail>): Promise<IResponse> {
    const existing = await this.findOne(id);
    if (!existing.success)  return existing;
      //throw new NotFoundException(`ReglementDetail ${id} not found`);
    Object.assign(existing.data, reglementDetail);
    const save = await this.reglementDetailRepository.save(existing.data);
    return {
      success:true,
      data: save,
      message:OPERATION_SUCCES
    }
  }

  async remove(id: number): Promise<void> {
    await this.reglementDetailRepository.delete(id);
    //const result = await this.reglementDetailRepository.delete(id);
   // if (result.affected === 0) throw new NotFoundException(`ReglementDetail ${id} not found`);
  }
}