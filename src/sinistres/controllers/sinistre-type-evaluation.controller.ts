import {
  Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe,
  HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SinistreTypeEvaluationService } from '../services/sinistre-type-evaluation.service';
import { SinistreTypeEvaluation } from '../entities/sinistre-type-evaluation.entity';

@ApiTags('Sinistres - Types d\'évaluation')
@Controller('sinistre-type-evaluation')
export class SinistreTypeEvaluationController {
  constructor(private readonly sinistreTypeEvaluationService: SinistreTypeEvaluationService) {}

  @Get()
  @ApiOperation({ summary: 'Liste tous les types d\'évaluation' })
  findAll(): Promise<SinistreTypeEvaluation[]> {
    return this.sinistreTypeEvaluationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère un type d\'évaluation par ID' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<SinistreTypeEvaluation> {
    return this.sinistreTypeEvaluationService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crée un nouveau type d\'évaluation' })
  create(@Body() typeEvaluation: Partial<SinistreTypeEvaluation>): Promise<SinistreTypeEvaluation> {
    return this.sinistreTypeEvaluationService.create(typeEvaluation);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Met à jour un type d\'évaluation' })
  update(@Param('id', ParseIntPipe) id: number, @Body() typeEvaluation: Partial<SinistreTypeEvaluation>): Promise<SinistreTypeEvaluation> {
    return this.sinistreTypeEvaluationService.update(id, typeEvaluation);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprime un type d\'évaluation' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.sinistreTypeEvaluationService.remove(id);
  }
}