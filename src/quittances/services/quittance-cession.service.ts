import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuittanceCession } from '../entities/quittance-cession.entity';

@Injectable()
export class QuittanceCessionService {
  constructor(
    @InjectRepository(QuittanceCession)
    private quittanceCessionRepository: Repository<QuittanceCession>,
  ) {}

  findAll(): Promise<QuittanceCession[]> {
    return this.quittanceCessionRepository.find({
      relations: ['quittance', 'acteur', 'natureCession'],
    });
  }

  findOne(id: number): Promise<QuittanceCession> {
    return this.quittanceCessionRepository.findOneOrFail({
      where: { id },
      relations: ['quittance', 'acteur', 'natureCession', 'bordereaux', 'echeancesPmd', 'notesDebitCredit'],
    });
  }

  findByQuittance(quittanceId: number): Promise<QuittanceCession[]> {
    return this.quittanceCessionRepository.find({
      where: { quittanceId },
      relations: ['acteur', 'natureCession'],
    });
  }

  async create(quittanceCession: Partial<QuittanceCession>): Promise<QuittanceCession> {
    const newQC = this.quittanceCessionRepository.create(quittanceCession);
    return this.quittanceCessionRepository.save(newQC);
  }

  async update(id: number, quittanceCession: Partial<QuittanceCession>): Promise<QuittanceCession> {
    const existing = await this.findOne(id);
    if (!existing) throw new NotFoundException(`QuittanceCession ${id} not found`);
    Object.assign(existing, quittanceCession);
    return this.quittanceCessionRepository.save(existing);
  }

  async remove(id: number): Promise<void> {
    const result = await this.quittanceCessionRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`QuittanceCession ${id} not found`);
  }
}