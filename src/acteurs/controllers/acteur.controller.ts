import {
  Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe,
  HttpCode, HttpStatus, Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ActeurService } from '../services/acteur.service';
import { Acteur } from '../entities/acteur.entity';

@ApiTags('Acteurs')
@Controller('acteurs')
export class ActeurController {
  constructor(private readonly acteurService: ActeurService) {}

  @Get()
  @ApiOperation({ summary: 'Liste tous les acteurs' })
  findAll(
    @Query('isCourtier') isCourtier?: boolean,
    @Query('isCompagnieAssurance') isCompagnieAssurance?: boolean,
    @Query('isReassureur') isReassureur?: boolean,
  ): Promise<Acteur[]> {
    return this.acteurService.findByType({ isCourtier, isCompagnieAssurance, isReassureur });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère un acteur par ID' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Acteur> {
    return this.acteurService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crée un nouvel acteur' })
  create(@Body() acteur: Partial<Acteur>): Promise<Acteur> {
    return this.acteurService.create(acteur);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Met à jour un acteur' })
  update(@Param('id', ParseIntPipe) id: number, @Body() acteur: Partial<Acteur>): Promise<Acteur> {
    return this.acteurService.update(id, acteur);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprime un acteur' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.acteurService.remove(id);
  }
}