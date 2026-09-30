import {
  Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe,
  HttpCode, HttpStatus, Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { QuittanceCessionService } from '../services/quittance-cession.service';
import { QuittanceCession } from '../entities/quittance-cession.entity';

@ApiTags('Métier Affaires - Quittances Cession')
@Controller('quittances-cession')
export class QuittanceCessionController {
  constructor(private readonly quittanceCessionService: QuittanceCessionService) {}

  @Get()
  @ApiOperation({ summary: 'Liste toutes les quittances de cession' })
  findAll(@Query('quittanceId') quittanceId?: number): Promise<QuittanceCession[]> {
    if (quittanceId) return this.quittanceCessionService.findByQuittance(quittanceId);
    return this.quittanceCessionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère une quittance de cession par ID' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<QuittanceCession> {
    return this.quittanceCessionService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crée une nouvelle quittance de cession' })
  create(@Body() quittanceCession: Partial<QuittanceCession>): Promise<QuittanceCession> {
    return this.quittanceCessionService.create(quittanceCession);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Met à jour une quittance de cession' })
  update(@Param('id', ParseIntPipe) id: number, @Body() quittanceCession: Partial<QuittanceCession>): Promise<QuittanceCession> {
    return this.quittanceCessionService.update(id, quittanceCession);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprime une quittance de cession' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.quittanceCessionService.remove(id);
  }
}