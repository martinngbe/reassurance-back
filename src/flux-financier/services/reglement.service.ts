import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reglement } from '../entities/reglement.entity';

@Injectable()
export class ReglementService {
  constructor(
    @InjectRepository(Reglement)
    private reglementRepository: Repository<Reglement>,
  ) {}

  findAll(): Promise<Reglement[]> {
    return this.reglementRepository.find({
      relations: ['acteur', 'noteDebitCredit', 'details'],
    });
  }

  findOne(id: number): Promise<Reglement> {
    return this.reglementRepository.findOneOrFail({
      where: { id },
      relations: ['acteur', 'noteDebitCredit', 'details'],
    });
  }

  async create(reglement: Partial<Reglement>): Promise<Reglement> {
    const newReglement = this.reglementRepository.create(reglement);
    return this.reglementRepository.save(newReglement);
  }

  async update(id: number, reglement: Partial<Reglement>): Promise<Reglement> {
    const existing = await this.findOne(id);
    if (!existing) throw new NotFoundException(`Reglement ${id} not found`);
    Object.assign(existing, reglement);
    return this.reglementRepository.save(existing);
  }

  async remove(id: number): Promise<void> {
    const result = await this.reglementRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Reglement ${id} not found`);
  }
}