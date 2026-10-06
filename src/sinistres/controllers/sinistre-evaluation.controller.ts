import {
  Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe,
  HttpCode, HttpStatus, Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SinistreEvaluationService } from '../services/sinistre-evaluation.service';
import { SinistreEvaluation } from '../entities/sinistre-evaluation.entity';

@ApiTags('Sinistres - Évaluations')
@Controller('sinistre-evaluation')
export class SinistreEvaluationController {
  constructor(private readonly sinistreEvaluationService: SinistreEvaluationService) {}

  @Get()
  @ApiOperation({ summary: 'Liste toutes les évaluations de sinistre' })
  findAll(@Query('declarationId') declarationId?: number): Promise<SinistreEvaluation[]> {
    if (declarationId) return this.sinistreEvaluationService.findByDeclaration(declarationId);
    return this.sinistreEvaluationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère une évaluation de sinistre par ID' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<SinistreEvaluation> {
    return this.sinistreEvaluationService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crée une nouvelle évaluation de sinistre' })
  create(@Body() evaluation: Partial<SinistreEvaluation>): Promise<SinistreEvaluation> {
    return this.sinistreEvaluationService.create(evaluation);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Met à jour une évaluation de sinistre' })
  update(@Param('id', ParseIntPipe) id: number, @Body() evaluation: Partial<SinistreEvaluation>): Promise<SinistreEvaluation> {
    return this.sinistreEvaluationService.update(id, evaluation);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprime une évaluation de sinistre' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.sinistreEvaluationService.remove(id);
  }
}