import {
  Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe,
  HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { NatureCessionService } from '../services/nature-cession.service';
import { NatureCession } from '../entities/nature-cession.entity';

@ApiTags('Métier Flux Financier - Natures de Cession')
@Controller('natures-cession')
export class NatureCessionController {
  constructor(private readonly natureCessionService: NatureCessionService) {}

  @Get()
  @ApiOperation({ summary: 'Liste toutes les natures de cession' })
  findAll(): Promise<NatureCession[]> {
    return this.natureCessionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère une nature de cession par ID' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<NatureCession> {
    return this.natureCessionService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crée une nouvelle nature de cession' })
  create(@Body() natureCession: Partial<NatureCession>): Promise<NatureCession> {
    return this.natureCessionService.create(natureCession);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Met à jour une nature de cession' })
  update(@Param('id', ParseIntPipe) id: number, @Body() natureCession: Partial<NatureCession>): Promise<NatureCession> {
    return this.natureCessionService.update(id, natureCession);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprime une nature de cession' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.natureCessionService.remove(id);
  }
}