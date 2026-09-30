import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NoteDebitCredit } from '../entities/note-debit-credit.entity';

@Injectable()
export class NoteDebitCreditService {
  constructor(
    @InjectRepository(NoteDebitCredit)
    private ndcRepository: Repository<NoteDebitCredit>,
  ) {}

  findAll(): Promise<NoteDebitCredit[]> {
    return this.ndcRepository.find({
      relations: ['quittance', 'quittanceCession', 'bordereau', 'compteTraite', 'echeancePmd', 'reglements'],
    });
  }

  findOne(id: number): Promise<NoteDebitCredit> {
    return this.ndcRepository.findOneOrFail({
      where: { id },
      relations: ['quittance', 'quittanceCession', 'bordereau', 'compteTraite', 'echeancePmd', 'reglements'],
    });
  }

  async create(ndc: Partial<NoteDebitCredit>): Promise<NoteDebitCredit> {
    const newNdc = this.ndcRepository.create(ndc);
    return this.ndcRepository.save(newNdc);
  }

  async update(id: number, ndc: Partial<NoteDebitCredit>): Promise<NoteDebitCredit> {
    const existing = await this.findOne(id);
    if (!existing) throw new NotFoundException(`NoteDebitCredit ${id} not found`);
    Object.assign(existing, ndc);
    return this.ndcRepository.save(existing);
  }

  async remove(id: number): Promise<void> {
    const result = await this.ndcRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`NoteDebitCredit ${id} not found`);
  }
}