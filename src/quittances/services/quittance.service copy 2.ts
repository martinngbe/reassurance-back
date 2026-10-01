// import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository, EntityNotFoundError } from 'typeorm';
// import { QuittanceAnnulationService } from './quittance-annulation.service';
// import { Quittance } from '../entities/quittance.entity';

// @Injectable()
// export class QuittanceService {
//   constructor(
//     @InjectRepository(Quittance)
//     private quittanceRepository: Repository<Quittance>,
//     private readonly annulationService: QuittanceAnnulationService,
//   ) {}

//   findAll(): Promise<Quittance[]> {
//     return this.quittanceRepository.find({
//       relations: [
//         'police', 'acteur', 'campagne', 'mouvement',
//         'bordereaux', 'echeancesPmd', 'notesDebitCredit',
//       ],
//     });
//   }

//   async findOne(id: number): Promise<Quittance> {
//     try {
//       return await this.quittanceRepository.findOneOrFail({
//         where: { id },
//         relations: [
//           'police', 'police.branche', 'police.sousBranche',
//           'acteur',  'mouvement',
//           'bordereaux', 'echeancesPmd', 'notesDebitCredit',
//           'quittancesCession', 'objetsAssures',
//         ],
//       });
//     } catch (error) {
//       if (error instanceof EntityNotFoundError) {
//         throw new NotFoundException(`Quittance with id ${id} not found`);
//       }
//       throw error;
//     }
//   }

//   findByPolice(policeId: number): Promise<Quittance[]> {
//     return this.quittanceRepository.find({
//       where: { policeId },
//       relations: ['police', 'acteur'],
//     });
//   }

//   async create(quittance: Partial<Quittance>): Promise<Quittance> {
//     const newQuittance = this.quittanceRepository.create(quittance);
//     return this.quittanceRepository.save(newQuittance);
//   }

//   async update(id: number, quittance: Partial<Quittance>): Promise<Quittance> {
//     const existing = await this.findOne(id);
//     Object.assign(existing, quittance);
//     return this.quittanceRepository.save(existing);
//   }

//   /**
//    * Annulation complète en cascade via le service dédié
//    */
//   async annuler(id: number): Promise<Quittance> {
//     return this.annulationService.annuler(id);
//   }

//   async remove(id: number): Promise<void> {
//     const result = await this.quittanceRepository.delete(id);
//     if (result.affected === 0) {
//       throw new NotFoundException(`Quittance with id ${id} not found`);
//     }
//   }
// }