import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { PaginationParams, IResponse, OPERATION_SUCCES, OPERATION_ECHEC } from 'src/common/crud/crud.service';
import { EcheancePmd } from '../entities/echeance-pmd.entity';

@Injectable()
export class EcheancePmdService {
  constructor(
    @InjectRepository(EcheancePmd)
    private echeancePmdRepository: Repository<EcheancePmd>,
  ) {}

 
    /**
     * Récupère les entités avec pagination.
     * @param pagination Objet contenant page et limit
     * @param options Options TypeORM classiques (where, relations, order...)
     */
  async findAll(
    pagination: PaginationParams = {},
    options: FindManyOptions<EcheancePmd> = {},
    ): Promise<IResponse> {
    const page = pagination.page && pagination.page > 0 ? pagination.page : 1;
    const limit = pagination.limit && pagination.limit > 0 ? pagination.limit : 10;
    const skip = (page - 1) * limit;

    const [data, total] = await this.echeancePmdRepository.findAndCount({
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
    const echeancePmd = await  this.echeancePmdRepository.findOneOrFail({
      where: { id } });
    if(!echeancePmd)  
      return {
        success:false,
        message: `EcheancePmd N° ${id} est introuvable`
    }
     return {
        success:true,
        data:echeancePmd,
        message: OPERATION_SUCCES
    }
  }


  async create(echeancePmd: Partial<EcheancePmd>): Promise<IResponse> {
    const newEval = this.echeancePmdRepository.create(echeancePmd);
    const save = await this.echeancePmdRepository.save(newEval);
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

  async update(id: number, echeancePmd: Partial<EcheancePmd>): Promise<IResponse> {
    const existing = await this.findOne(id);
    if (!existing.success)  return existing;
      //throw new NotFoundException(`EcheancePmd ${id} not found`);
    Object.assign(existing.data, echeancePmd);
    const save = await this.echeancePmdRepository.save(existing.data);
    return {
      success:true,
      data: save,
      message:OPERATION_SUCCES
    }
  }

  async remove(id: number): Promise<void> {
    await this.echeancePmdRepository.delete(id);
    //const result = await this.echeancePmdRepository.delete(id);
   // if (result.affected === 0) throw new NotFoundException(`EcheancePmd ${id} not found`);
  }
}