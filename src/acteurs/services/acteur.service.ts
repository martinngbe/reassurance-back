import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Acteur } from '../entities/acteur.entity';

@Injectable()
export class ActeurService {
  constructor(
    @InjectRepository(Acteur)
    private acteurRepository: Repository<Acteur>,
  ) {}

  findAll(): Promise<Acteur[]> {
    return this.acteurRepository.find({
      relations: ['pays', 'domaineActivite'],
    });
  }

  findOne(id: number): Promise<Acteur> {
    return this.acteurRepository.findOneOrFail({
      where: { id },
      relations: ['pays', 'domaineActivite', 'policesCedante', 'policesCourtier', 'quittances', 'comptesTraite'],
    });
  }

  findByType(filters: {
    isCourtier?: boolean;
    isCompagnieAssurance?: boolean;
    isReassureur?: boolean;
  }): Promise<Acteur[]> {
    return this.acteurRepository.find({ where: filters });
  }

  async create(acteur: Partial<Acteur>): Promise<Acteur> {
    const newActeur = this.acteurRepository.create(acteur);
    return this.acteurRepository.save(newActeur);
  }

  async update(id: number, acteur: Partial<Acteur>): Promise<Acteur> {
    const existing = await this.findOne(id);
    if (!existing) throw new NotFoundException(`Acteur ${id} not found`);
    Object.assign(existing, acteur);
    return this.acteurRepository.save(existing);
  }

  async remove(id: number): Promise<void> {
    const result = await this.acteurRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Acteur ${id} not found`);
  }
}