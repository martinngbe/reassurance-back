import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NatureCession } from '../entities/nature-cession.entity';

@Injectable()
export class NatureCessionService {
  constructor(
    @InjectRepository(NatureCession)
    private natureCessionRepository: Repository<NatureCession>,
  ) {}

  findAll(): Promise<NatureCession[]> {
    return this.natureCessionRepository.find();
  }

  findOne(id: number): Promise<NatureCession> {
    return this.natureCessionRepository.findOneOrFail({ where: { id } });
  }

  async create(natureCession: Partial<NatureCession>): Promise<NatureCession> {
    const newNC = this.natureCessionRepository.create(natureCession);
    return this.natureCessionRepository.save(newNC);
  }

  async update(id: number, natureCession: Partial<NatureCession>): Promise<NatureCession> {
    const existing = await this.findOne(id);
    if (!existing) throw new NotFoundException(`NatureCession ${id} not found`);
    Object.assign(existing, natureCession);
    return this.natureCessionRepository.save(existing);
  }

  async remove(id: number): Promise<void> {
    const result = await this.natureCessionRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`NatureCession ${id} not found`);
  }
}