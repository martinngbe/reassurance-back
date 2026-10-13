import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from '../../common/crud/crud.controller';

import { Role } from '../entities/role.entity';
import { RoleService } from '../services/role.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { FindManyOptions } from 'typeorm';

@ApiTags('Role')
@Controller('role')
export class RoleController extends CrudController<Role, CreateRoleDto, UpdateRoleDto> {
  constructor(service: RoleService) {
    super(service);
  }

  // les diffentes options ou filtre pour le Role
  protected buildOptions(query: any): FindManyOptions<Role> {
    const options: FindManyOptions<Role> = {
      where: {},
      order: { code: 'ASC' }, // Tri par défaut
    };

    // // Filtre par statut
    // if (query.statut) {
    //   (options.where as any).statut = query.statut;
    // }

    // // Filtre par catégorie (relation)
    // if (query.categorieId) {
    //   (options.where as any).categorie = { id: parseInt(query.categorieId, 10) };
    // }

    // // Recherche partielle sur le nom
    // if (query.search) {
    //   (options.where as any).nom = Like(`%${query.search}%`);
    // }

    // // Charger les relations
    // if (query.withRelations === 'true') {
    //   options.relations = ['categorie', 'produits'];
    // }

    return options;
  }

}
