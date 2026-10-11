import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { SinistreReglementDetail } from '../entities/sinistre-reglement-detail.entity';
import { PaginationParams, IResponse, OPERATION_SUCCES, OPERATION_ECHEC } from 'src/common/crud/crud.service';
import { SinistreReglement } from '../entities/sinistre-reglement.entity';

@Injectable()
export class SinistreReglementDetailService {
  constructor(
    @InjectRepository(SinistreReglementDetail)
    private sinistreReglementDetailRepository: Repository<SinistreReglementDetail>,
  ) {}

  // findAll(): Promise<SinistreReglementDetail[]> {
  //   return this.sinistreReglementDetailRepository.find({
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
    options: FindManyOptions<SinistreReglementDetail> = {},
    ): Promise<IResponse> {
    const page = pagination.page && pagination.page > 0 ? pagination.page : 1;
    const limit = pagination.limit && pagination.limit > 0 ? pagination.limit : 10;
    const skip = (page - 1) * limit;

    const [data, total] = await this.sinistreReglementDetailRepository.findAndCount({
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
     const sinistreReglementDetail = await this.sinistreReglementDetailRepository.findOneOrFail({ where: { id }})
        if(!sinistreReglementDetail) return {
          success:false,
          message:`Sinistre Règlement detail id:${id} est introuvable`
        }
        return {
          success:true,
          data:sinistreReglementDetail,
          message:OPERATION_SUCCES
        }
    // return this.sinistreReglementDetailRepository.findOneOrFail({
    //   where: { id },
    //   relations: [
    //     'sinistre',
    //     'details', 'details.sinistreEvaluation',
    //     'cessions', 'cessions.details',
    //   ],
    // });
  }

  async create(reglement: Partial<SinistreReglementDetail>): Promise<IResponse> {
    const newReglement = this.sinistreReglementDetailRepository.create(reglement);
    const sinistreReglementDetail = await this.sinistreReglementDetailRepository.save(newReglement);
    if(!sinistreReglementDetail) return {
      success:false,
      message:OPERATION_ECHEC
    }
    return {
      success:true,
      data:sinistreReglementDetail,
      message:OPERATION_SUCCES
    }
    //return this.sinistreReglementDetailRepository.save(newReglement);
  }

  async update(id: number, reglement: Partial<SinistreReglementDetail>): Promise<IResponse> {
    const existing = await this.findOne(id);
    if(!existing.success) return existing;

     Object.assign(existing.data, reglement);
    //return this.sinistreReglementRepository.save(existing);
    const sinistreReglementDetail = await this.sinistreReglementDetailRepository.save(existing.data);
    if(!sinistreReglementDetail) return {
      success:false,
      message:OPERATION_ECHEC
    }
    return {
      success:true,
      data:sinistreReglementDetail,
      message:OPERATION_SUCCES
    }
    // const existing = await this.findOne(id);
    // if (!existing) throw new NotFoundException(`SinistreReglementDetail ${id} not found`);
    // Object.assign(existing, reglement);
    // return this.sinistreReglementDetailRepository.save(existing);
  }

  async remove(id: number): Promise<void> {
    await this.sinistreReglementDetailRepository.delete(id);
    //const result = await this.sinistreReglementDetailRepository.delete(id);
    //if (result.affected === 0) throw new NotFoundException(`SinistreReglementDetail ${id} not found`);
  }
}