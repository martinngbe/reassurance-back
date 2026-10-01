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

  async annuler(bordereauId: number): Promise<void> {
      const bordereau = await  this.bordereauRepository.findOne( {
        where: { id: bordereauId },
        relations: ['notesDebitCredit'],
      });
  
      if (!bordereau || bordereau.isAnnule) return;
  
/*      // Annuler les NDC liées à ce bordereau
      for (const ndc of bordereau.notesDebitCredit || []) {
        await this.annulerNoteDebitCredit(ndc.id, queryRunner, now);
      }
*/  
      // Créer la copie d'annulation
      const annulation = this.bordereauRepository.create({
        ...bordereau,
        id: undefined,
        montant: - bordereau.montant,
        isAnnule: true,
        bordereauIdAnnule: bordereau.id,
        createdAt: undefined,
        updatedAt: undefined,
      });
      const bordereauAnnulation= await  this.bordereauRepository.save( annulation);
  
      bordereau.isAnnule = true;
      bordereau.bordereauIdAnnule=bordereauAnnulation.id
      await  this.bordereauRepository.save(bordereau);
    }
    
}