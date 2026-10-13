// import {  Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { FindManyOptions, Repository } from 'typeorm';
// import { Role } from '../entities/role.entity';
// import { PaginationParams, IResponse, OPERATION_ECHEC, OPERATION_SUCCES } from 'src/common/crud/crud.service';

// @Injectable()
// export class RoleService {
//   constructor(
//     @InjectRepository(Role)
//     private roleRepository: Repository<Role>,
//   ) {}

//   /**
//    * Récupère les entités avec pagination.
//    * @param pagination Objet contenant page et limit
//    * @param options Options TypeORM classiques (where, relations, order...)
//    */
//  async findAll(
//   pagination: PaginationParams = {},
//   options: FindManyOptions<Role> = {},
//   ): Promise<IResponse> {
//   const page = pagination.page && pagination.page > 0 ? pagination.page : 1;
//   const limit = pagination.limit && pagination.limit > 0 ? pagination.limit : 10;
//   const skip = (page - 1) * limit;

//   const [data, total] = await this.roleRepository.findAndCount({
//     ...options,
//     skip,
//     take: limit,
//      select: {
//           id: true,
//           code: true,
//           label: true,
//   },
//     order: {
//     code: 'ASC',
//     label: 'ASC',
//   },
//   });

//   return {
//     success: true,
//     data,
//     pageInfo: {
//         total,
//         page,
//         limit,
//         totalPages: Math.ceil(total / limit),
//       }
//   } ;
// }

//  async findOne(id: number): Promise<IResponse> {
  
    
// const role = await this.roleRepository.findOneOrFail({
//   where: { id },
//   select: {
//     id: true,
//     code: true,
//     label: true,  
//   },
// });
//     if(!role)
//       return {
//         success:false,
//         message: `Aucun rôle pour id: ${id} `
//       }
//     return   {
//         success:true,
//         data: role,
//         message: OPERATION_SUCCES
//       }
//   }
//   async create(role: Partial<Role>): Promise<IResponse> {
//     const newRole = this.roleRepository.create(role);
//     const save =this.roleRepository.save(newRole);
//       if(!save)
//       return {
//         success:false,
//         message: `Echec de création de rôle `
//       }
//     return   {
//         success:true,
//         data: save,
//         message: OPERATION_SUCCES
//       }
    
//   }

//   async update(id: number, role: Partial<Role>): Promise<IResponse> {
//     const existing = await this.findOne(id);
//     //if (!existing) throw new NotFoundException(`Role ${id} not found`);
//     if(!existing.success)
//       return {
//         success:false,
//         message: `Aucun role pour id: ${id} `
//       }
//     Object.assign(existing, role);
//     const save= await  this.roleRepository.save(existing.data);

//       if(!save)
//       return {
//         success:false,
//         message: `Echec de mise à jour pour role  id: ${id}`
//       }
//     return   {
//         success:true,
//         data: save,
//         message: OPERATION_SUCCES
//       }
//   }

//   async remove(id: number): Promise<void> {
//     const result = await this.roleRepository.delete(id);
//    // if (result.affected === 0) throw new NotFoundException(`Role ${id} not found`);
//   }
 
// }