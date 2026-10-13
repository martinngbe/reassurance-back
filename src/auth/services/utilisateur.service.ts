import {  Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Utilisateur } from '../entities/utilisateur.entity';
import { failure, OPERATION_SUCCES } from 'src/common/helper/response.helper';
import { PaginationParams, IResponse } from 'src/common/interfaces/response.interface';
import { RoleService } from './role.service';
import { Role } from '../entities/role.entity';

@Injectable()
export class UtilisateurService {
  constructor(
    @InjectRepository(Utilisateur)
    private utilisateurRepository: Repository<Utilisateur>,
    private readonly roleService: RoleService, 
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

 async findOne(id: number): Promise<Utilisateur> {
    
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
   
  },
});
   if (!utilisateur) {
        throw new NotFoundException(
          failure(`${this.utilisateurRepository.metadata.name} #${id} introuvable`)
        );
      }
      return utilisateur;
  }
  async create(utilisateur: Partial<Utilisateur>): Promise<Utilisateur> {
    // Récupérer le rôle ADMIN (il est garanti d'exister maintenant)
    const consultationRole = await this.roleService.findOneByCode('CONSULTATION' );
    // l"utilisateur créer avec un rol par defaut : CONSULTATION
    utilisateur.roles =consultationRole ? [consultationRole] : [];   
    if(!utilisateur.password){
      // ajout d'un mot de passe par défaut
      utilisateur.password ="Reass123";
    }
    const newUtilisateur = this.utilisateurRepository.create(utilisateur);
    const user =  await this.utilisateurRepository.save(newUtilisateur);
    return user;

    
  }

  async update(id: number, utilisateur: Partial<Utilisateur>): Promise<Utilisateur> {
     const entity = await this.findOne(id);
    const merged = this.utilisateurRepository.merge(entity, utilisateur);
    return this.utilisateurRepository.save(merged);
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    await this.utilisateurRepository.remove(entity);
  }
 



   /**
   * Récupère tous les rôles avec indication de ceux attribués à un utilisateur
   */
  async findRolesForUser(userId: number): Promise<any[]> {
    // Vérifier que l'utilisateur existe
    const user = await this.utilisateurRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(
        failure(`Utilisateur #${userId} introuvable`)
      );
    }

    return this.roleService.findAllWithUserAssignment(userId);
  }

  /**
   * Récupère les rôles attribués à un utilisateur
   */
  async getUserRoles(userId: number): Promise<Role[]> {
    const user = await this.utilisateurRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });

    if (!user) {
      throw new NotFoundException(
        failure(`Utilisateur #${userId} introuvable`)
      );
    }

    return user.roles || [];
  }
}