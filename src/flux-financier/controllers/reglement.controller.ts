import {
  Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe,
  HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ReglementService } from '../services/reglement.service';
import { Reglement } from '../entities/reglement.entity';

@ApiTags('Métier Flux Financier - Règlements')
@Controller('reglements')
export class ReglementController {
  constructor(private readonly reglementService: ReglementService) {}

  @Get()
  @ApiOperation({ summary: 'Liste tous les règlements' })
  findAll(): Promise<Reglement[]> {
    return this.reglementService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère un règlement par ID' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Reglement> {
    return this.reglementService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crée un nouveau règlement' })
  create(@Body() reglement: Partial<Reglement>): Promise<Reglement> {
    return this.reglementService.create(reglement);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Met à jour un règlement' })
  update(@Param('id', ParseIntPipe) id: number, @Body() reglement: Partial<Reglement>): Promise<Reglement> {
    return this.reglementService.update(id, reglement);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprime un règlement' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.reglementService.remove(id);
  }
}