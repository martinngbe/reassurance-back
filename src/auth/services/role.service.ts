import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { 
  CrudService, 
} from '../../common/crud/crud.service';
import { Role } from '../entities/role.entity';
import { failure } from 'src/common/helper/response.helper';

@Injectable()
export class RoleService extends CrudService<Role> {
  constructor(@InjectRepository(Role) repository: Repository<Role>) {
    super(repository);
  }

  /**
     * Récupère une entité par son code.
     */
    async findOneByCode(code: string): Promise<Role> {
      const entity = await this.repository.findOneBy({ code });
  
      if (!entity) {
        throw new NotFoundException(
          failure(`${this.repository.metadata.name} #${code} introuvable`)
        );
      }
      return entity;
    }

    /**
   * Récupère tous les rôles avec indication de ceux attribués à un utilisateur
   */
  // async findAllWithUserAssignment(userId: number): Promise<any[]> {
  //   // Récupérer tous les rôles
  //   const allRoles = await this.repository.find({
  //     order: { code: 'ASC' },
  //   });

  //   // Récupérer les IDs des rôles de l'utilisateur
  //   const userRoles = await this.repository
  //     .createQueryBuilder('role')
  //     .innerJoin('role.utilisateurs', 'utilisateur')
  //     .where('utilisateur.id = :userId', { userId })
  //     .select('role.id')
  //     .getMany();

  //   const userRoleIds = new Set(userRoles.map((r) => r.id));

  //   // Marquer les rôles attribués
  //   return allRoles.map((role) => ({
  //     id: role.id,
  //     code: role.code,
  //     label: role.label,
  //     description: role.description,
  //     assigned: userRoleIds.has(role.id),
  //   }));
  // }
async findAllWithUserAssignment(userId: number): Promise<any[]> {
  const roles = await this.repository
    .createQueryBuilder('role')
    .leftJoin(
      'role.utilisateurs',
      'utilisateur',
      'utilisateur.id = :userId',
      { userId }
    )
    .select([
      'role.id AS id',
      'role.code AS code',
      'role.label AS label',
      'role.description AS description',
      'CASE WHEN utilisateur.id IS NOT NULL THEN true ELSE false END AS assigned',
    ])
    .orderBy('role.code', 'ASC')
    .getRawMany();

  return roles;
}
}