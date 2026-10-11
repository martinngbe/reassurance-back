import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { SinistreEvaluation } from '../entities/sinistre-evaluation.entity';
import { PaginationParams, IResponse, OPERATION_ECHEC, OPERATION_SUCCES } from 'src/common/crud/crud.service';
import { Sinistre } from '../entities/sinistre.entity';

@Injectable()
export class SinistreEvaluationService {
  constructor(
    @InjectRepository(SinistreEvaluation)
    private sinistreEvaluationRepository: Repository<SinistreEvaluation>,
  ) {}

  // findAll(): Promise<SinistreEvaluation[]> {
  //   return this.sinistreEvaluationRepository.find({
  //     relations: ['sinistreDeclaration', 'sinistreTypeEvaluation', 'reglementDetails', 'evaluationQuittances'],
  //   });
  // }
    /**
     * Récupère les entités avec pagination.
     * @param pagination Objet contenant page et limit
     * @param options Options TypeORM classiques (where, relations, order...)
     */
  async findAll(
    pagination: PaginationParams = {},
    options: FindManyOptions<SinistreEvaluation> = {},
    ): Promise<IResponse> {
    const page = pagination.page && pagination.page > 0 ? pagination.page : 1;
    const limit = pagination.limit && pagination.limit > 0 ? pagination.limit : 10;
    const skip = (page - 1) * limit;

    const [data, total] = await this.sinistreEvaluationRepository.findAndCount({
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
    const sinistreEvaluation = await 
     this.sinistreEvaluationRepository.findOneOrFail({
      where: { id },
      relations: ['sinistre', 'sinistreTypeEvaluation'],
    });
    if(!sinistreEvaluation) return {
      success:false,
      message: `Sinistre évaluation id:${id} introuvable`
    }
    return {
      success:true,
      data:sinistreEvaluation,
      message: `Sinistre évaluation id:${id} introuvable`
    }
  }

 
  async create(evaluation: Partial<SinistreEvaluation>): Promise<IResponse> {
    const newEval = this.sinistreEvaluationRepository.create(evaluation);
    const sinistreEvaluation = await  this.sinistreEvaluationRepository.save(newEval);
      if(!sinistreEvaluation) return {
      success:false,
      message: OPERATION_ECHEC
    }
    return {
      success:true,
      data:sinistreEvaluation,
      message: OPERATION_SUCCES
    }
  }

  async update(id: number, evaluation: Partial<SinistreEvaluation>): Promise<IResponse> {
    const existing = await this.findOne(id);
    //if (!existing) throw new NotFoundException(`SinistreEvaluation ${id} not found`);
    if(!existing.success) return existing;

    Object.assign(existing, evaluation);
    const sinistreEvaluation= await this.sinistreEvaluationRepository.save(existing.data);
    if(!sinistreEvaluation) return {
      success:false,
      message: OPERATION_ECHEC
    }
    return {
      success:true,
      data:sinistreEvaluation,
      message: OPERATION_SUCCES
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.sinistreEvaluationRepository.delete(id);
    //if (result.affected === 0) throw new NotFoundException(`SinistreEvaluation ${id} not found`);
  }
}