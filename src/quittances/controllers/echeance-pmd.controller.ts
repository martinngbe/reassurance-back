import {
  Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe,
  HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { EcheancePmdService } from '../services/echeance-pmd.service';
import { EcheancePmd } from '../entities/echeance-pmd.entity';

@ApiTags('Métier Flux Financier - Échéances PMD')
@Controller('echeances-pmd')
export class EcheancePmdController {
  constructor(private readonly echeancePmdService: EcheancePmdService) {}

  @Get()
  @ApiOperation({ summary: 'Liste toutes les échéances PMD' })
  findAll(): Promise<EcheancePmd[]> {
    return this.echeancePmdService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère une échéance PMD par ID' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<EcheancePmd> {
    return this.echeancePmdService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crée une nouvelle échéance PMD' })
  create(@Body() echeancePmd: Partial<EcheancePmd>): Promise<EcheancePmd> {
    return this.echeancePmdService.create(echeancePmd);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Met à jour une échéance PMD' })
  update(@Param('id', ParseIntPipe) id: number, @Body() echeancePmd: Partial<EcheancePmd>): Promise<EcheancePmd> {
    return this.echeancePmdService.update(id, echeancePmd);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprime une échéance PMD' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.echeancePmdService.remove(id);
  }
}