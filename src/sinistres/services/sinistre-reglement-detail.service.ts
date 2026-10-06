import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SinistreReglementDetail } from '../entities/sinistre-reglement-detail.entity';

@Injectable()
export class SinistreReglementDetailService {
  constructor(
    @InjectRepository(SinistreReglementDetail)
    private sinistreReglementDetailRepository: Repository<SinistreReglementDetail>,
  ) {}

  findAll(): Promise<SinistreReglementDetail[]> {
    return this.sinistreReglementDetailRepository.find({
      relations: ['sinistre', 'details', 'cessions'],
    });
  }

  findOne(id: number): Promise<SinistreReglementDetail> {
    return this.sinistreReglementDetailRepository.findOneOrFail({
      where: { id },
      relations: [
        'sinistre',
        'details', 'details.sinistreEvaluation',
        'cessions', 'cessions.details',
      ],
    });
  }

  async create(reglement: Partial<SinistreReglementDetail>): Promise<SinistreReglementDetail> {
    const newReglement = this.sinistreReglementDetailRepository.create(reglement);
    return this.sinistreReglementDetailRepository.save(newReglement);
  }

  async update(id: number, reglement: Partial<SinistreReglementDetail>): Promise<SinistreReglementDetail> {
    const existing = await this.findOne(id);
    if (!existing) throw new NotFoundException(`SinistreReglementDetail ${id} not found`);
    Object.assign(existing, reglement);
    return this.sinistreReglementDetailRepository.save(existing);
  }

  async remove(id: number): Promise<void> {
    const result = await this.sinistreReglementDetailRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`SinistreReglementDetail ${id} not found`);
  }
}