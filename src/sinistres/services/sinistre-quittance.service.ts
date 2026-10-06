import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SinistreQuittance } from '../entities/sinistre-quittance.entity';

@Injectable()
export class SinistreQuittanceService {
  constructor(
    @InjectRepository(SinistreQuittance)
    private sinistreQuittanceRepository: Repository<SinistreQuittance>,
  ) {}

  findAll(): Promise<SinistreQuittance[]> {
    return this.sinistreQuittanceRepository.find({
      relations: ['sinistreQuittance', 'sinistreTypeQuittance', 'reglementDetails', 'quittanceQuittances'],
    });
  }

  findOne(id: number): Promise<SinistreQuittance> {
    return this.sinistreQuittanceRepository.findOneOrFail({
      where: { id },
      //relations: ['sinistreQuittance', 'sinistreTypeQuittance', 'reglementDetails', 'quittanceQuittances'],
    });
  }

  findByQuittance(quittanceId: number): Promise<SinistreQuittance[]> {
    return this.sinistreQuittanceRepository.find({
      where: { sinistreId: quittanceId },
      //relations: ['sinistreTypeQuittance'],
    });
  }

  async create(quittance: Partial<SinistreQuittance>): Promise<SinistreQuittance> {
    const newEval = this.sinistreQuittanceRepository.create(quittance);
    return this.sinistreQuittanceRepository.save(newEval);
  }

  async update(id: number, quittance: Partial<SinistreQuittance>): Promise<SinistreQuittance> {
    const existing = await this.findOne(id);
    if (!existing) throw new NotFoundException(`SinistreQuittance ${id} not found`);
    Object.assign(existing, quittance);
    return this.sinistreQuittanceRepository.save(existing);
  }

  async remove(id: number): Promise<void> {
    const result = await this.sinistreQuittanceRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`SinistreQuittance ${id} not found`);
  }
}