import {
  Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe,
  HttpCode, HttpStatus, Query, Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UtilisateurService } from '../services/utilisateur.service';
import { Utilisateur } from '../entities/utilisateur.entity';
import { IResponse, PaginationParams } from 'src/common/crud/crud.service';
import { FindManyOptions } from 'typeorm';
import { Roles } from '../decorators/roles.decorator';

@ApiTags('Utilisateurs')
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
  findOne(@Param('id', ParseIntPipe) id: number): Promise<IResponse> {
    return this.utilisateurService.findOne(id);
  }

  @Post()
  @Roles('admin') // Seuls les admins peuvent accéder ici
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crée une nouvelle utilisateur' })
  create(@Body() utilisateur: Partial<Utilisateur>): Promise<IResponse> {
    return this.utilisateurService.create(utilisateur);
  }

  @Put(':id')
  @Roles('admin') // Seuls les admins peuvent accéder ici
  @ApiOperation({ summary: 'Met à jour une utilisateur' })
  update(@Param('id', ParseIntPipe) id: number, 
        @Body() utilisateur: Partial<Utilisateur>): Promise<IResponse> {
    return this.utilisateurService.update(id, utilisateur);
  }

  @Delete(':id')
  @Roles('admin') // Seuls les admins peuvent accéder ici
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprime une utilisateur' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.utilisateurService.remove(id);
  }
}