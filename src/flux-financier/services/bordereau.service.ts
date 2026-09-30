import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bordereau } from '../entities/bordereau.entity';

@Injectable()
export class BordereauService {
  constructor(
    @InjectRepository(Bordereau)
    private bordereauRepository: Repository<Bordereau>,
  ) {}

  findAll(): Promise<Bordereau[]> {
    return this.bordereauRepository.find({
      relations: ['quittance', 'quittanceCession', 'notesDebitCredit'],
    });
  }

  findOne(id: number): Promise<Bordereau> {
    return this.bordereauRepository.findOneOrFail({
      where: { id },
      relations: ['quittance', 'quittanceCession', 'notesDebitCredit'],
    });
  }

  async create(bordereau: Partial<Bordereau>): Promise<Bordereau> {
    const newBordereau = this.bordereauRepository.create(bordereau);
    return this.bordereauRepository.save(newBordereau);
  }

  async update(id: number, bordereau: Partial<Bordereau>): Promise<Bordereau> {
    const existing = await this.findOne(id);
    if (!existing) throw new NotFoundException(`Bordereau ${id} not found`);
    Object.assign(existing, bordereau);
    return this.bordereauRepository.save(existing);
  }

  async remove(id: number): Promise<void> {
    const result = await this.bordereauRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Bordereau ${id} not found`);
  }
}