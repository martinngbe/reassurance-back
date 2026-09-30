import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SinistreTypeEvaluation } from '../entities/sinistre-type-evaluation.entity';

@Injectable()
export class SinistreTypeEvaluationService {
  constructor(
    @InjectRepository(SinistreTypeEvaluation)
    private sinistreTypeEvaluationRepository: Repository<SinistreTypeEvaluation>,
  ) {}

  findAll(): Promise<SinistreTypeEvaluation[]> {
    return this.sinistreTypeEvaluationRepository.find();
  }

  findOne(id: number): Promise<SinistreTypeEvaluation> {
    return this.sinistreTypeEvaluationRepository.findOneOrFail({ where: { id } });
  }

  async create(typeEvaluation: Partial<SinistreTypeEvaluation>): Promise<SinistreTypeEvaluation> {
    const newTE = this.sinistreTypeEvaluationRepository.create(typeEvaluation);
    return this.sinistreTypeEvaluationRepository.save(newTE);
  }

  async update(id: number, typeEvaluation: Partial<SinistreTypeEvaluation>): Promise<SinistreTypeEvaluation> {
    const existing = await this.findOne(id);
    if (!existing) throw new NotFoundException(`SinistreTypeEvaluation ${id} not found`);
    Object.assign(existing, typeEvaluation);
    return this.sinistreTypeEvaluationRepository.save(existing);
  }

  async remove(id: number): Promise<void> {
    const result = await this.sinistreTypeEvaluationRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`SinistreTypeEvaluation ${id} not found`);
  }
}