import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branche } from '../entities/branche.entity';

@Injectable()
export class BrancheService {
  constructor(
    @InjectRepository(Branche)
    private brancheRepository: Repository<Branche>,
  ) {}

  findAll(): Promise<Branche[]> {
    return this.brancheRepository.find({ relations: ['sousBranches'] });
  }

  findOne(id: number): Promise<Branche> {
    return this.brancheRepository.findOneOrFail({
      where: { id },
      relations: ['sousBranches', 'polices'],
    });
  }

  async create(branche: Partial<Branche>): Promise<Branche> {
    const newBranche = this.brancheRepository.create(branche);
    return this.brancheRepository.save(newBranche);
  }

  async update(id: number, branche: Partial<Branche>): Promise<Branche> {
    const existing = await this.findOne(id);
    if (!existing) throw new NotFoundException(`Branche ${id} not found`);
    Object.assign(existing, branche);
    return this.brancheRepository.save(existing);
  }

  async remove(id: number): Promise<void> {
    const result = await this.brancheRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Branche ${id} not found`);
  }
}