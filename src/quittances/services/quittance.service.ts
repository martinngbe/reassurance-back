import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quittance } from '../entities/quittance.entity';
import { Transactional } from '@nestjs-cls/transactional';

@Injectable()
export class QuittanceService {
  constructor(
    @InjectRepository(Quittance)
    private quittanceRepository: Repository<Quittance>,
  ) {}

  findAll(): Promise<Quittance[]> {
    return this.quittanceRepository.find({
      relations: ['police', 'acteur', 'campagne', 'mouvement', 'bordereaux', 'echeancesPmd', 'notesDebitCredit'],
    });
  }

  findOne(id: number): Promise<Quittance> {
    return this.quittanceRepository.findOneOrFail({
      where: { id },
      relations: [
        'police', 'police.branche', 'police.sousBranche',
        'acteur',  'mouvement',
        'bordereaux', 'echeancesPmd', 'notesDebitCredit',
        'quittancesCession', 'objetsAssures',
      ],
    });
  }

  findByPolice(policeId: number): Promise<Quittance[]> {
    return this.quittanceRepository.find({
      where: { policeId },
      relations: ['police', 'acteur'],
    });
  }

  async create(quittance: Partial<Quittance>): Promise<Quittance> {
    const newQuittance = this.quittanceRepository.create(quittance);
    return this.quittanceRepository.save(newQuittance);
  }

  async update(id: number, quittance: Partial<Quittance>): Promise<Quittance> {
    const existing = await this.findOne(id);
    if (!existing) throw new NotFoundException(`Quittance ${id} not found`);
    Object.assign(existing, quittance);
    return this.quittanceRepository.save(existing);
  }

  async remove(id: number): Promise<void> {
    const result = await this.quittanceRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Quittance ${id} not found`);
  }
 
  @Transactional()
  async annuler(id: number): Promise<Quittance> {
    const quittance = await this.findOne(id);
    if (!quittance) throw new NotFoundException(`Quittance ${id} not found`);

    const annulation = this.quittanceRepository.create({
      ...quittance,
      id: undefined,
      isAnnule: true,
      quittanceIdAnnule: id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    quittance.isAnnule = true;
    await this.quittanceRepository.save(quittance);
/*

    'quittancesCession',
        'bordereaux',
        'echeancesPmd',
        'comptesTraite',
        'notesDebitCredit',
*/
    return this.quittanceRepository.save(annulation);
  }
}