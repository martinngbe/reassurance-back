import {
  Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe,
  HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SinistreReglement } from '../entities/sinistre-reglement.entity';
import { SinistreReglementService } from '../services/sinistre-reglement.service';

@ApiTags('Sinistres - Règlements')
@Controller('sinistre-reglement')
export class SinistreReglementController {
  constructor(private readonly sinistreReglementService: SinistreReglementService) {}

  @Get()
  @ApiOperation({ summary: 'Liste tous les règlements de sinistre' })
  findAll(): Promise<SinistreReglement[]> {
    return this.sinistreReglementService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère un règlement de sinistre par ID' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<SinistreReglement> {
    return this.sinistreReglementService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crée un nouveau règlement de sinistre' })
  create(@Body() reglement: Partial<SinistreReglement>): Promise<SinistreReglement> {
    return this.sinistreReglementService.create(reglement);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Met à jour un règlement de sinistre' })
  update(@Param('id', ParseIntPipe) id: number, @Body() reglement: Partial<SinistreReglement>): Promise<SinistreReglement> {
    return this.sinistreReglementService.update(id, reglement);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprime un règlement de sinistre' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.sinistreReglementService.remove(id);
  }
}