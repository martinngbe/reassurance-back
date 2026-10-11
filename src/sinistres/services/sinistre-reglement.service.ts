import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { SinistreReglement } from '../entities/sinistre-reglement.entity';
import { PaginationParams, IResponse, OPERATION_SUCCES, OPERATION_ECHEC } from 'src/common/crud/crud.service';
import { Sinistre } from '../entities/sinistre.entity';

@Injectable()
export class SinistreReglementService {
  constructor(
    @InjectRepository(SinistreReglement)
    private sinistreReglementRepository: Repository<SinistreReglement>,
  ) {}

  // findAll(): Promise<SinistreReglement[]> {
  //   return this.sinistreReglementRepository.find({
  //     relations: ['sinistre', 'details', 'cessions'],
  //   });
  // }
    /**
     * Récupère les entités avec pagination.
     * @param pagination Objet contenant page et limit
     * @param options Options TypeORM classiques (where, relations, order...)
     */
  async findAll(
    pagination: PaginationParams = {},
    options: FindManyOptions<SinistreReglement> = {},
    ): Promise<IResponse> {
    const page = pagination.page && pagination.page > 0 ? pagination.page : 1;
    const limit = pagination.limit && pagination.limit > 0 ? pagination.limit : 10;
    const skip = (page - 1) * limit;

    const [data, total] = await this.sinistreReglementRepository.findAndCount({
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
  async findOne(id: number): Promise<IResponse> {
    const sinistreReglement = await this.sinistreReglementRepository.findOneOrFail({ where: { id }})
    if(!sinistreReglement) return {
      success:false,
      message:`Sinistre Règlement id:${id} est introuvable`
    }
    return {
      success:true,
      data:sinistreReglement,
      message:OPERATION_SUCCES
    }
    // return this.sinistreReglementRepository.findOneOrFail({
    //   where: { id },
    //   // relations: [
    //   //   'sinistre',
    //   //   'details', 'details.sinistreEvaluation',
    //   //   'cessions', 'cessions.details',
    //   // ],
    // });
  }

  async create(reglement: Partial<SinistreReglement>): Promise<IResponse> {
    const newReglement = this.sinistreReglementRepository.create(reglement);
    //return this.sinistreReglementRepository.save(newReglement);
    const sinistreReglement = await this.sinistreReglementRepository.save(newReglement);
    if(!sinistreReglement) return {
      success:false,
      message:OPERATION_ECHEC
    }
    return {
      success:true,
      data:sinistreReglement,
      message:OPERATION_SUCCES
    }
  }

  async update(id: number, reglement: Partial<SinistreReglement>): Promise<IResponse> {
    const existing = await this.findOne(id);
    //if (!existing) throw new NotFoundException(`SinistreReglement ${id} not found`);
    if(!existing.success) return existing;
    Object.assign(existing.data, reglement);
    //return this.sinistreReglementRepository.save(existing);
    const sinistreReglement = await this.sinistreReglementRepository.save(existing.data);
    if(!sinistreReglement) return {
      success:false,
      message:OPERATION_ECHEC
    }
    return {
      success:true,
      data:sinistreReglement,
      message:OPERATION_SUCCES
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.sinistreReglementRepository.delete(id);
    //if (result.affected === 0) throw new NotFoundException(`SinistreReglement ${id} not found`);
  }
}