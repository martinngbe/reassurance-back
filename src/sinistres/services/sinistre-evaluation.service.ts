import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SinistreEvaluation } from '../entities/sinistre-evaluation.entity';

@Injectable()
export class SinistreEvaluationService {
  constructor(
    @InjectRepository(SinistreEvaluation)
    private sinistreEvaluationRepository: Repository<SinistreEvaluation>,
  ) {}

  findAll(): Promise<SinistreEvaluation[]> {
    return this.sinistreEvaluationRepository.find({
      relations: ['sinistreDeclaration', 'sinistreTypeEvaluation', 'reglementDetails', 'evaluationQuittances'],
    });
  }

  findOne(id: number): Promise<SinistreEvaluation> {
    return this.sinistreEvaluationRepository.findOneOrFail({
      where: { id },
      relations: ['sinistreDeclaration', 'sinistreTypeEvaluation', 'reglementDetails', 'evaluationQuittances'],
    });
  }

  findByDeclaration(declarationId: number): Promise<SinistreEvaluation[]> {
    return this.sinistreEvaluationRepository.find({
      where: { sinistreDeclarationId: declarationId },
      relations: ['sinistreTypeEvaluation'],
    });
  }

  async create(evaluation: Partial<SinistreEvaluation>): Promise<SinistreEvaluation> {
    const newEval = this.sinistreEvaluationRepository.create(evaluation);
    return this.sinistreEvaluationRepository.save(newEval);
  }

  async update(id: number, evaluation: Partial<SinistreEvaluation>): Promise<SinistreEvaluation> {
    const existing = await this.findOne(id);
    if (!existing) throw new NotFoundException(`SinistreEvaluation ${id} not found`);
    Object.assign(existing, evaluation);
    return this.sinistreEvaluationRepository.save(existing);
  }

  async remove(id: number): Promise<void> {
    const result = await this.sinistreEvaluationRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`SinistreEvaluation ${id} not found`);
  }
}