import {
  Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe,
  HttpCode, HttpStatus, Query, Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SinistreService } from '../services/sinistre.service';
import { Sinistre } from '../entities/sinistre.entity';
import { IResponse, PaginationParams } from 'src/common/crud/crud.service';
import { FindManyOptions } from 'typeorm';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('Sinistre')
@Controller('sinistre')
export class SinistreController {
  constructor(private readonly sinistreService: SinistreService) {}

  @Get()
  @ApiOperation({ summary: 'Liste tous les sinistres' })
  async findAll(  
    pagination: PaginationParams = {},
    options: FindManyOptions<Sinistre> = {}): Promise<IResponse> {   
    return this.sinistreService.findAll(pagination,options);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère un sinistre par ID' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<IResponse> {
    return this.sinistreService.findOne(id);
  }

  @Post()
  @Roles('GESTIONNAIRE-SINISTRE') // Seuls les gestionnaires sinistres peuvent accéder ici
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crée une nouvelle sinistre' })
  create(@Body() sinistre: Partial<Sinistre>): Promise<IResponse> {
    return this.sinistreService.create(sinistre);
  }

  @Put(':id')
  @Roles('GESTIONNAIRE-SINISTRE') // Seuls les gestionnaires sinistres peuvent accéder ici
  @ApiOperation({ summary: 'Met à jour une sinistre' })
  update(@Param('id', ParseIntPipe) id: number, 
        @Body() sinistre: Partial<Sinistre>): Promise<IResponse> {
    return this.sinistreService.update(id, sinistre);
  }

  @Delete(':id')
  @Roles('GESTIONNAIRE-SINISTRE') // Seuls les gestionnaires sinistres peuvent accéder ici
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprime une sinistre' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.sinistreService.remove(id);
  }
}