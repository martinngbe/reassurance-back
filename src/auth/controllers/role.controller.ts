import { Controller, Get, InternalServerErrorException, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from '../../common/crud/crud.controller';

import { Role } from '../entities/role.entity';
import { RoleService } from '../services/role.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { FindManyOptions } from 'typeorm';
import { failure } from 'src/common/helper/response.helper';

@ApiTags('Role')
@Controller('role')
export class RoleController extends CrudController<Role, CreateRoleDto, UpdateRoleDto> {
  // constructor(service: RoleService) {
  //   super(service);
  // }
// ✅ Redéclaration avec le type spécifique
  constructor(private readonly roleService: RoleService) {
    super(roleService);
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


  /**
   * GET /role/user/:userId
   * Retourne tous les rôles paginés avec marquage "assigned" pour un utilisateur
   */
  @Get('user/:userId')
  async getRolesForUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('sortKey') sortKey?: string,
    @Query('sortDirection') sortDirection?: 'ASC' | 'DESC',
  ) {
    console.log(  `_________________________________________________`)
    console.log(  `      RoleController.getRolesForUser userId:${userId}`)
    console.log(  `_________________________________________________`)
    try {

       
        const resultat = await this.roleService.findAllWithUserAssignment(userId, {
          page: page ? Number(page) : 1,
          limit: limit ? Number(limit) : 10,
          search,
          sortKey,
          sortDirection,
        });
         console.log(  `resultat:`,resultat)
        return resultat;
    } catch (error) {
       const message = error instanceof Error ? error.message : String(error);
       console.log(  `>>>>>>>>>>>>>>>> Erreur findAllWithUserAssignment: ${message}`)
        //this.logger.error(`Erreur findAllWithUserAssignment: ${message}`, error instanceof Error ? error.stack : undefined);
        throw new InternalServerErrorException( failure(`Erreur findAllWithUserAssignment: ${message}`) );
    }
  
  }
}

