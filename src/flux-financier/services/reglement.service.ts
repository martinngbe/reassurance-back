import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { PaginationParams, IResponse, OPERATION_SUCCES, OPERATION_ECHEC } from 'src/common/crud/crud.service';
import { Reglement } from '../entities/reglement.entity';

@Injectable()
export class ReglementService {
  constructor(
    @InjectRepository(Reglement)
    private reglementRepository: Repository<Reglement>,
  ) {}

 
    /**
     * Récupère les entités avec pagination.
     * @param pagination Objet contenant page et limit
     * @param options Options TypeORM classiques (where, relations, order...)
     */
  async findAll(
    pagination: PaginationParams = {},
    options: FindManyOptions<Reglement> = {},
    ): Promise<IResponse> {
    const page = pagination.page && pagination.page > 0 ? pagination.page : 1;
    const limit = pagination.limit && pagination.limit > 0 ? pagination.limit : 10;
    const skip = (page - 1) * limit;

    const [data, total] = await this.reglementRepository.findAndCount({
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
    const reglement = await  this.reglementRepository.findOneOrFail({
      where: { id } });
    if(!reglement)  
      return {
        success:false,
        message: `Reglement N° ${id} est introuvable`
    }
     return {
        success:true,
        data:reglement,
        message: OPERATION_SUCCES
    }
  }


  async create(reglement: Partial<Reglement>): Promise<IResponse> {
    const newEval = this.reglementRepository.create(reglement);
    const save = await this.reglementRepository.save(newEval);
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

  async update(id: number, reglement: Partial<Reglement>): Promise<IResponse> {
    const existing = await this.findOne(id);
    if (!existing.success)  return existing;
      //throw new NotFoundException(`Reglement ${id} not found`);
    Object.assign(existing.data, reglement);
    const save = await this.reglementRepository.save(existing.data);
    return {
      success:true,
      data: save,
      message:OPERATION_SUCCES
    }
  }

  async remove(id: number): Promise<void> {
    await this.reglementRepository.delete(id);
    //const result = await this.reglementRepository.delete(id);
   // if (result.affected === 0) throw new NotFoundException(`Reglement ${id} not found`);
  }
}