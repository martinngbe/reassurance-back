import {  Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Utilisateur } from '../entities/utilisateur.entity';
import { PaginationParams, IResponse, OPERATION_ECHEC, OPERATION_SUCCES } from 'src/common/crud/crud.service';

@Injectable()
export class UtilisateurService {
  constructor(
    @InjectRepository(Utilisateur)
    private utilisateurRepository: Repository<Utilisateur>,
  ) {}

  /**
   * Récupère les entités avec pagination.
   * @param pagination Objet contenant page et limit
   * @param options Options TypeORM classiques (where, relations, order...)
   */
 async findAll(
  pagination: PaginationParams = {},
  options: FindManyOptions<Utilisateur> = {},
  ): Promise<IResponse> {
  const page = pagination.page && pagination.page > 0 ? pagination.page : 1;
  const limit = pagination.limit && pagination.limit > 0 ? pagination.limit : 10;
  const skip = (page - 1) * limit;

  const [data, total] = await this.utilisateurRepository.findAndCount({
    ...options,
    skip,
    take: limit,
     select: {
          id: true,
          nom: true,
          prenoms: true,
          email: true,
          isActive: true,
          // relations si besoin
          // roles: {
          //   id: true,
          //   code: true,
          //   label:true
          // },
  },
 // relations: ['roles'],
    order: {
    nom: 'ASC',
    prenoms: 'ASC',
  },
  });

  return {
    success: true,
    data,
    pageInfo: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      }
  } ;
}


  // findAll(): Promise<Utilisateur[]> {
  //   return this.utilisateurRepository.find({
  //     relations: ['roles'],
  //   });
  // }
 async findOne(id: number): Promise<IResponse> {
    // const utilisateur = await this.utilisateurRepository.findOneOrFail({
    //   where: { id },
    //   relations: ['roles'],
    //   select: ['id', 'nom', 'prenoms','email' ,'isActive'], // uniquement ces champs
    // });
    
const utilisateur = await this.utilisateurRepository.findOneOrFail({
  where: { id },
 // relations: ['roles'],
  select: {
    // champs de l'utilisateur
    id: true,
    nom: true,
    prenoms: true,
    email: true,
    isActive: true,
    // champs de la relation roles
    // roles: {
    //   id: true,
    //   code: true,
    //   label:true,        // adapte selon ta colonne (nom, libelle, code...)
    //   // description: true,
    // },
  },
});
    if(!utilisateur)
      return {
        success:false,
        message: `Aucun utilisateur pour id: ${id} `
      }
    return   {
        success:true,
        data: utilisateur,
        message: OPERATION_SUCCES
      }
  }
  async create(utilisateur: Partial<Utilisateur>): Promise<IResponse> {
    const newUtilisateur = this.utilisateurRepository.create(utilisateur);
    const save =this.utilisateurRepository.save(newUtilisateur);
      if(!save)
      return {
        success:false,
        message: `Echec de création de utilisateur `
      }
    return   {
        success:true,
        data: save,
        message: OPERATION_SUCCES
      }
    
  }

  async update(id: number, utilisateur: Partial<Utilisateur>): Promise<IResponse> {
    const existing = await this.findOne(id);
    //if (!existing) throw new NotFoundException(`Utilisateur ${id} not found`);
    if(!existing.success)
      return {
        success:false,
        message: `Aucun utilisateur pour id: ${id} `
      }
    Object.assign(existing, utilisateur);
    const save= await  this.utilisateurRepository.save(existing.data);

      if(!save)
      return {
        success:false,
        message: `Echec de mise à jour pour utilisateur  id: ${id}`
      }
    return   {
        success:true,
        data: save,
        message: OPERATION_SUCCES
      }
  }

  async remove(id: number): Promise<void> {
    const result = await this.utilisateurRepository.delete(id);
   // if (result.affected === 0) throw new NotFoundException(`Utilisateur ${id} not found`);
  }
 
}