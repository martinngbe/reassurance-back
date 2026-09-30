import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompteTraite } from '../entities/compte-traite.entity';

@Injectable()
export class CompteTraiteService {
  constructor(
    @InjectRepository(CompteTraite)
    private compteTraiteRepository: Repository<CompteTraite>,
  ) {}

  findAll(): Promise<CompteTraite[]> {
    return this.compteTraiteRepository.find({
      relations: ['compteType', 'acteur', 'details', 'notesDebitCredit'],
    });
  }

  findOne(id: number): Promise<CompteTraite> {
    return this.compteTraiteRepository.findOneOrFail({
      where: { id },
      relations: ['compteType', 'acteur', 'details', 'notesDebitCredit'],
    });
  }

  findByActeur(acteurId: number): Promise<CompteTraite[]> {
    return this.compteTraiteRepository.find({
      where: { acteurId },
      relations: ['compteType', 'details'],
    });
  }

  async create(compteTraite: Partial<CompteTraite>): Promise<CompteTraite> {
    const newCT = this.compteTraiteRepository.create(compteTraite);
    return this.compteTraiteRepository.save(newCT);
  }

  async update(id: number, compteTraite: Partial<CompteTraite>): Promise<CompteTraite> {
    const existing = await this.findOne(id);
    if (!existing) throw new NotFoundException(`CompteTraite ${id} not found`);
    Object.assign(existing, compteTraite);
    return this.compteTraiteRepository.save(existing);
  }

  async remove(id: number): Promise<void> {
    const result = await this.compteTraiteRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`CompteTraite ${id} not found`);
  }
}