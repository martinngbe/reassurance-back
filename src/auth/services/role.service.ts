// role.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, In, Repository } from 'typeorm';
import { CrudService } from '../../common/crud/crud.service';
import { Role } from '../entities/role.entity';
import { failure } from 'src/common/helper/response.helper';
import { LogMethod } from 'src/common/decorateur/log-method.decorator';

@Injectable()
export class RoleService extends CrudService<Role> {
  
  constructor(@InjectRepository(Role) repository: Repository<Role>) {
    super(repository);
  }

  async findOneByCode(code: string): Promise<Role> {
    const entity = await this.repository.findOneBy({ code });
    if (!entity) {
      throw new NotFoundException(
        failure(`${this.repository.metadata.name} #${code} introuvable`)
      );
    }
    return entity;
  }

  @LogMethod()
    async findAllWithUserAssignment(
    userId: number,
    pagination: { page?: number; limit?: number; search?: string; sortKey?: string; sortDirection?: 'ASC' | 'DESC' } = {},
  ) {
    const page = pagination.page && pagination.page > 0 ? pagination.page : 1;
    const limit = pagination.limit && pagination.limit > 0 ? pagination.limit : 10;
    const skip = (page - 1) * limit;
    console.log(  `_________________________________________________`)
    console.log(  `      RoleService.getRolesForUser pagination:`, pagination , " userId:",userId)
    console.log(  `_________________________________________________`)
    // 1️⃣ Requête de comptage (très simple)
    const countQb = this.repository.createQueryBuilder('role');
    if (pagination.search) {
      countQb.where('role.code ILIKE :search OR role.label ILIKE :search', { search: `%${pagination.search}%` });
    }
    const total = await countQb.getCount();
    console.log(  `total:`, total )
   
    // 2️⃣ Requête des rôles paginés (sans jointure)
    const qb = this.repository.createQueryBuilder('role');
    if (pagination.search) {
      qb.where('role.code ILIKE :search OR role.label ILIKE :search', { search: `%${pagination.search}%` });
    }
  
    const sortKey = pagination.sortKey ?? 'code';
    const sortDirection = pagination.sortDirection ?? 'ASC';
    console.log(  `sortKey:`, sortKey )
    qb.orderBy(`role.${sortKey}`, sortDirection)
      .skip(skip)
      .take(limit);

    const roles = await qb.getMany(); // Récupère directement les entités, pas besoin de getRawAndEntities()
    console.log(  `roles:`, roles ) 
    // 3️⃣ Récupération des IDs des rôles assignés à cet utilisateur (Requête ultra-rapide)
    const assignedRoles = await this.repository.manager
      .createQueryBuilder()
      .select('role_id')
      .from('role_utilisateur', 'ru')
      .where('ru.utilisateur_id = :userId', { userId })
      .getRawMany();

    // On crée un Set pour une recherche en O(1) (très performant)
    const assignedRoleIds = new Set(assignedRoles.map((r: any) => r.role_id));

    // 4️⃣ Fusion en mémoire
    const data = roles.map((role) => ({
      id: role.id,
      code: role.code,
      label: role.label,
      description: role.description,
      assigned: assignedRoleIds.has(role.id), // ✅ Simple, propre, sans parsing de string
    }));
    console.log(  `data:`, data ) 
    return {
      success: true,
      data,
      pageInfo: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

   /**
   * Récupère une liste de rôles à partir d'un tableau d'IDs
   */
  async findByIds(roleIds: number[]): Promise<Role[]> {
    // Sécurité : si le tableau est vide, on retourne un tableau vide sans faire de requête
    if (!roleIds || roleIds.length === 0) {
      return [];
    }

    // Utilisation de l'opérateur 'In' pour faire un WHERE id IN (...)
    return this.repository.findBy({
      id: In(roleIds),
    });
  }
}