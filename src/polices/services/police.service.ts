import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Police } from '../entities/police.entity';

@Injectable()
export class PoliceService {
  constructor(
    @InjectRepository(Police)
    private policeRepository: Repository<Police>,
  ) {}

  findAll(): Promise<Police[]> {
    return this.policeRepository.find({
      relations: ['branche', 'sousBranche', 'acteurCedante', 'acteurCourtier'],
    });
  }

  findOne(id: number): Promise<Police> {
    return this.policeRepository.findOneOrFail({
      where: { id },
      relations: ['branche', 'sousBranche', 'acteurCedante', 'acteurCourtier', 'quittances'],
    });
  }

  async create(police: Partial<Police>): Promise<Police> {
    const newPolice = this.policeRepository.create(police);
    return this.policeRepository.save(newPolice);
  }

  async update(id: number, police: Partial<Police>): Promise<Police> {
    const existing = await this.findOne(id);
    if (!existing) {
      throw new NotFoundException(`Police with id ${id} not found`);
    }
    Object.assign(existing, police);
    return this.policeRepository.save(existing);
  }

  async remove(id: number): Promise<void> {
    const result = await this.policeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Police with id ${id} not found`);
    }
  }

  findByNumero(numero: string): Promise<Police> {
    return this.policeRepository.findOneOrFail({ where: { numero } });
  }
}