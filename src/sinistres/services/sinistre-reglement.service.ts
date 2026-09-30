import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SinistreReglement } from '../entities/sinistre-reglement.entity';

@Injectable()
export class SinistreReglementService {
  constructor(
    @InjectRepository(SinistreReglement)
    private sinistreReglementRepository: Repository<SinistreReglement>,
  ) {}

  findAll(): Promise<SinistreReglement[]> {
    return this.sinistreReglementRepository.find({
      relations: ['sinistreDeclaration', 'details', 'cessions'],
    });
  }

  findOne(id: number): Promise<SinistreReglement> {
    return this.sinistreReglementRepository.findOneOrFail({
      where: { id },
      relations: [
        'sinistreDeclaration',
        'details', 'details.sinistreEvaluation',
        'cessions', 'cessions.details',
      ],
    });
  }

  async create(reglement: Partial<SinistreReglement>): Promise<SinistreReglement> {
    const newReglement = this.sinistreReglementRepository.create(reglement);
    return this.sinistreReglementRepository.save(newReglement);
  }

  async update(id: number, reglement: Partial<SinistreReglement>): Promise<SinistreReglement> {
    const existing = await this.findOne(id);
    if (!existing) throw new NotFoundException(`SinistreReglement ${id} not found`);
    Object.assign(existing, reglement);
    return this.sinistreReglementRepository.save(existing);
  }

  async remove(id: number): Promise<void> {
    const result = await this.sinistreReglementRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`SinistreReglement ${id} not found`);
  }
}