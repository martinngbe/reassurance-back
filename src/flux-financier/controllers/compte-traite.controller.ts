import {
  Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe,
  HttpCode, HttpStatus, Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CompteTraiteService } from '../services/compte-traite.service';
import { CompteTraite } from '../entities/compte-traite.entity';
import { IResponse, PaginationParams } from 'src/common/crud/crud.service';
import { FindManyOptions } from 'typeorm';

@ApiTags('Métier Flux Financier - Comptes Traité')
@Controller('comptes-traite')
export class CompteTraiteController {
  constructor(private readonly compteTraiteService: CompteTraiteService) {}

  @Get()
  @ApiOperation({ summary: 'Liste tous les comptes traité' })
  findAll(
      pagination: PaginationParams = {},
      options: FindManyOptions<CompteTraite> = {},): Promise<IResponse> {
   // if (acteurId) return this.compteTraiteService.findByActeur(acteurId);
    return this.compteTraiteService.findAll(pagination,options);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère un compte traité par ID' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<IResponse> {
    return this.compteTraiteService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crée un nouveau compte traité' })
  create(@Body() compteTraite: Partial<CompteTraite>): Promise<IResponse> {
    return this.compteTraiteService.create(compteTraite);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Met à jour un compte traité' })
  update(@Param('id', ParseIntPipe) id: number, @Body() compteTraite: Partial<CompteTraite>): Promise<IResponse> {
    return this.compteTraiteService.update(id, compteTraite);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprime un compte traité' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.compteTraiteService.remove(id);
  }
}