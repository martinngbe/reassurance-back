import {
  Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { BrancheService } from '../services/branche.service';
import { Branche } from '../entities/branche.entity';

@ApiTags('Référentiel - Branches')
@Controller('branches')
export class BrancheController {
  constructor(private readonly brancheService: BrancheService) {}

  @Get()
  @ApiOperation({ summary: 'Liste toutes les branches' })
  findAll(): Promise<Branche[]> {
    return this.brancheService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère une branche par ID' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Branche> {
    return this.brancheService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crée une nouvelle branche' })
  create(@Body() branche: Partial<Branche>): Promise<Branche> {
    return this.brancheService.create(branche);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Met à jour une branche' })
  update(@Param('id', ParseIntPipe) id: number, @Body() branche: Partial<Branche>): Promise<Branche> {
    return this.brancheService.update(id, branche);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprime une branche' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.brancheService.remove(id);
  }
}