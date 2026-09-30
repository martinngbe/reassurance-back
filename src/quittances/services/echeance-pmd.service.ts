import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EcheancePmd } from '../entities/echeance-pmd.entity';

@Injectable()
export class EcheancePmdService {
  constructor(
    @InjectRepository(EcheancePmd)
    private echeancePmdRepository: Repository<EcheancePmd>,
  ) {}

  findAll(): Promise<EcheancePmd[]> {
    return this.echeancePmdRepository.find({
      relations: ['quittance', 'quittanceCession', 'notesDebitCredit'],
    });
  }

  findOne(id: number): Promise<EcheancePmd> {
    return this.echeancePmdRepository.findOneOrFail({
      where: { id },
      relations: ['quittance', 'quittanceCession', 'notesDebitCredit'],
    });
  }

  async create(echeancePmd: Partial<EcheancePmd>): Promise<EcheancePmd> {
    const newEP = this.echeancePmdRepository.create(echeancePmd);
    return this.echeancePmdRepository.save(newEP);
  }

  async update(id: number, echeancePmd: Partial<EcheancePmd>): Promise<EcheancePmd> {
    const existing = await this.findOne(id);
    if (!existing) throw new NotFoundException(`EcheancePmd ${id} not found`);
    Object.assign(existing, echeancePmd);
    return this.echeancePmdRepository.save(existing);
  }

  async remove(id: number): Promise<void> {
    const result = await this.echeancePmdRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`EcheancePmd ${id} not found`);
  }
}