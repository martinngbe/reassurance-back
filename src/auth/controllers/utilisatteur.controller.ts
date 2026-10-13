import {
  Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe,
  HttpCode, HttpStatus, Query, Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UtilisateurService } from '../services/utilisateur.service';
import { Utilisateur } from '../entities/utilisateur.entity';
import { FindManyOptions } from 'typeorm';
import { Roles } from '../decorators/roles.decorator';
import { IResponse, PaginationParams } from 'src/common/interfaces/response.interface';
import { OPERATION_SUCCES, success } from 'src/common/helper/response.helper';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('Utilisateurs')
@UseGuards(RolesGuard)
@Controller('utilisateur')
export class UtilisateurController {
  constructor(private readonly utilisateurService: UtilisateurService) {}

  @Get()
  @ApiOperation({ summary: 'Liste toutes les utilisateurs' })
  async findAll(  
    pagination: PaginationParams = {},
    options: FindManyOptions<Utilisateur> = {}): Promise<IResponse> {   
    return this.utilisateurService.findAll(pagination,options);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère une utilisateur par ID' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<IResponse<Utilisateur>> {
    const resultat = await this.utilisateurService.findOne(id);
    return success(resultat);
  }

  @Post()
  @Roles('ADMIN') // Seuls les admins peuvent accéder ici
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crée une nouvelle utilisateur' })
  async create(@Body() utilisateur: Partial<Utilisateur>): Promise<IResponse> {
    const resultat = await this.utilisateurService.create(utilisateur);     
    return success(resultat);
  }

  @Put(':id')
  @Roles('ADMIN') // Seuls les admins peuvent accéder ici
  @ApiOperation({ summary: 'Met à jour une utilisateur' })
  async update(@Param('id', ParseIntPipe) id: number, 
        @Body() utilisateur: Partial<Utilisateur>): Promise<IResponse> {
    // return this.utilisateurService.update(id, utilisateur);
    const resultat = await this.utilisateurService.update(id, utilisateur);
    return success(resultat);
  }
  @Patch(':id')
  @Roles('ADMIN') // Seuls les admins peuvent accéder ici
  @ApiOperation({ summary: 'Met à jour une utilisateur' })
  async patch(@Param('id', ParseIntPipe) id: number, 
        @Body() utilisateur: Partial<Utilisateur>): Promise<IResponse> {
    
    return this.update(id,utilisateur);
  }

  @Delete(':id')
  @Roles('ADMIN') // Seuls les admins peuvent accéder ici
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Supprime une utilisateur' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<IResponse> {
    await this.utilisateurService.remove(id);
    return {success:true , message: OPERATION_SUCCES}
  }




 
/**
   * GET /utilisateur/:id/roles
   * Retourne tous les rôles (paginés) avec le booléen "assigned"
   */
  @Get(':id/roles')
  @ApiOperation({ summary: 'Liste tous les rôles et marque ceux assignés à l\'utilisateur' })
  async getRolesForUser(
    @Param('id', ParseIntPipe) id: number,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('sortKey') sortKey?: string,
    @Query('sortDirection') sortDirection?: 'ASC' | 'DESC',
  ) {
    return this.utilisateurService.findRolesForUser(id, {
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 10,
      search,
      sortKey,
      sortDirection,
    });
  }
  /**
   * GET /utilisateurs/:id/roles/assigned
   * Retourne uniquement les rôles attribués à l'utilisateur
   */
  @Get(':id/roles/assigned')
  async getAssignedRoles(@Param('id', ParseIntPipe) id: number) {
    const roles = await this.utilisateurService.getUserRoles(id);
    return {
      success: true,
      data: roles,
    };
  }
  
  @Patch(':id/roles')
  @HttpCode(HttpStatus.OK)
  async assignRolesToUser(
    @Param('id') id: string,
    @Body() body: { roleIds: number[] },
  ) {
    const userId = parseInt(id, 10);
    await this.utilisateurService.assignRoles(userId, body.roleIds);
    return {
      success: true,
      message: 'Rôles assignés avec succès',
    };
  }
}