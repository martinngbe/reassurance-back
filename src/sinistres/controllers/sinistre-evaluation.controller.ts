import {
  Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe,
  HttpCode, HttpStatus, Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SinistreEvaluationService } from '../services/sinistre-evaluation.service';
import { SinistreEvaluation } from '../entities/sinistre-evaluation.entity';
import { PaginationParams, IResponse } from 'src/common/crud/crud.service';
import { FindManyOptions } from 'typeorm';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('Sinistres - Évaluations')
@Controller('sinistre-evaluation')
export class SinistreEvaluationController {
  constructor(private readonly sinistreEvaluationService: SinistreEvaluationService) {}

  @Get()
  @ApiOperation({ summary: 'Liste toutes les évaluations de sinistre' })
  async findAll(  
    pagination: PaginationParams = {},
    options: FindManyOptions<SinistreEvaluation> = {}): Promise<IResponse> {   
    return this.sinistreEvaluationService.findAll(pagination,options);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère une évaluation de sinistre par ID' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<IResponse> {
    return this.sinistreEvaluationService.findOne(id);
  }

  @Post()
  @Roles('GESTIONNAIRE-SINSITRE') // seul le gestionnaire sinistre est habillité
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crée une nouvelle évaluation de sinistre' })
  create(@Body() evaluation: Partial<SinistreEvaluation>): Promise<IResponse> {
    return this.sinistreEvaluationService.create(evaluation);
  }

  @Put(':id')
  @Roles('GESTIONNAIRE-SINSITRE') // seul le gestionnaire sinistre est habillité
  @ApiOperation({ summary: 'Met à jour une évaluation de sinistre' })
  update(@Param('id', ParseIntPipe) id: number, @Body() evaluation: Partial<SinistreEvaluation>): Promise<IResponse> {
    return this.sinistreEvaluationService.update(id, evaluation);
  }

  @Delete(':id')
  @Roles('GESTIONNAIRE-SINSITRE') // seul le gestionnaire sinistre est habillité
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprime une évaluation de sinistre' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.sinistreEvaluationService.remove(id);
  }
}