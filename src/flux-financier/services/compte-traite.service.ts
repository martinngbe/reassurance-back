import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { PaginationParams, IResponse, OPERATION_SUCCES, OPERATION_ECHEC } from 'src/common/crud/crud.service';
import { CompteTraite } from '../entities/compte-traite.entity';

@Injectable()
export class CompteTraiteService {
  constructor(
    @InjectRepository(CompteTraite)
    private compteTraiteRepository: Repository<CompteTraite>,
  ) {}

 
    /**
     * Récupère les entités avec pagination.
     * @param pagination Objet contenant page et limit
     * @param options Options TypeORM classiques (where, relations, order...)
     */
  async findAll(
    pagination: PaginationParams = {},
    options: FindManyOptions<CompteTraite> = {},
    ): Promise<IResponse> {
    const page = pagination.page && pagination.page > 0 ? pagination.page : 1;
    const limit = pagination.limit && pagination.limit > 0 ? pagination.limit : 10;
    const skip = (page - 1) * limit;

    const [data, total] = await this.compteTraiteRepository.findAndCount({
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
    const compteTraite = await  this.compteTraiteRepository.findOneOrFail({
      where: { id } });
    if(!compteTraite)  
      return {
        success:false,
        message: `CompteTraite N° ${id} est introuvable`
    }
     return {
        success:true,
        data:compteTraite,
        message: OPERATION_SUCCES
    }
  }


  async create(compteTraite: Partial<CompteTraite>): Promise<IResponse> {
    const newEval = this.compteTraiteRepository.create(compteTraite);
    const save = await this.compteTraiteRepository.save(newEval);
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

  async update(id: number, compteTraite: Partial<CompteTraite>): Promise<IResponse> {
    const existing = await this.findOne(id);
    if (!existing.success)  return existing;
      //throw new NotFoundException(`CompteTraite ${id} not found`);
    Object.assign(existing.data, compteTraite);
    const save = await this.compteTraiteRepository.save(existing.data);
    return {
      success:true,
      data: save,
      message:OPERATION_SUCCES
    }
  }

  async remove(id: number): Promise<void> {
    await this.compteTraiteRepository.delete(id);
    //const result = await this.compteTraiteRepository.delete(id);
   // if (result.affected === 0) throw new NotFoundException(`CompteTraite ${id} not found`);
  }
}