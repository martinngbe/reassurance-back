// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { FindManyOptions, Repository } from 'typeorm';
// import { Sinistre } from '../entities/sinistre.entity';
// import { PaginationParams, PaginatedResult } from 'src/common/crud/crud.service';

// @Injectable()
// export class SinistreService {
//   constructor(
//     @InjectRepository(Sinistre)
//     private sinistreRepository: Repository<Sinistre>,
//   ) {}

 
//     /**
//      * Récupère les entités avec pagination.
//      * @param pagination Objet contenant page et limit
//      * @param options Options TypeORM classiques (where, relations, order...)
//      */
//   async findAll(
//     pagination: PaginationParams = {},
//     options: FindManyOptions<Sinistre> = {},
//     ): Promise<PaginatedResult<Sinistre>> {
//     const page = pagination.page && pagination.page > 0 ? pagination.page : 1;
//     const limit = pagination.limit && pagination.limit > 0 ? pagination.limit : 10;
//     const skip = (page - 1) * limit;

//     const [data, total] = await this.sinistreRepository.findAndCount({
//       ...options,
//       skip,
//       take: limit,
//       order: {
//       createdAt: 'DESC',
//     },
//     });

//     return {      
//       data,
//       pageInfo: {
//           total,
//           page,
//           limit,
//           totalPages: Math.ceil(total / limit),
//         }
//     } ;
//   }
//  async  findOne(id: number): Promise<Sinistre> {
//     const sinistre = await  this.sinistreRepository.findOneOrFail({
//       where: { id } });
//     if(!sinistre)  
//       return {
//         success:false,
//         message: `Sinistre N° ${id} est introuvable`
//     }
//      return {
//         success:true,
//         data:sinistre,
//         message: OPERATION_SUCCES
//     }
//   }


//   async create(sinistre: Partial<Sinistre>): Promise<IResponse> {
//     const newEval = this.sinistreRepository.create(sinistre);
//     const save = await this.sinistreRepository.save(newEval);
//     if(!save) return{
//       success:false,
//       message:OPERATION_ECHEC
//     }
//     return {
//       success:true,
//       data:save,
//       message:OPERATION_SUCCES
//     }
//   }

//   async update(id: number, sinistre: Partial<Sinistre>): Promise<IResponse> {
//     const existing = await this.findOne(id);
//     if (!existing.success)  return existing;
//       //throw new NotFoundException(`Sinistre ${id} not found`);
//     Object.assign(existing.data, sinistre);
//     const save = await this.sinistreRepository.save(existing.data);
//     return {
//       success:true,
//       data: save,
//       message:OPERATION_SUCCES
//     }
//   }

//   async remove(id: number): Promise<void> {
//     await this.sinistreRepository.delete(id);
//     //const result = await this.sinistreRepository.delete(id);
//    // if (result.affected === 0) throw new NotFoundException(`Sinistre ${id} not found`);
//   }
// }