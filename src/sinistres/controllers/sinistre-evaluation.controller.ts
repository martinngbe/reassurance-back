import {
  Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe,
  HttpCode, HttpStatus, Query, Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FindManyOptions } from 'typeorm';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { IResponse,   PaginationParams } from 'src/common/interfaces/response.interface';
import { OPERATION_SUCCES, success, successPaginated } from 'src/common/helper/response.helper';
import { SinistreEvaluation } from '../entities/sinistre-evaluation.entity';
import { SinistreEvaluationService } from '../services/sinistre-evaluation.service';

@ApiTags('SinistreEvaluation')
@Controller('sinistre-evaluation')
export class SinistreEvaluationController {
  constructor(private readonly sinistreEvaluationService: SinistreEvaluationService) {}

  @Get()
  @ApiOperation({ summary: 'Liste tous les sinistreEvaluations par page' })
  async findAll(  
    pagination: PaginationParams = {},
    options: FindManyOptions<SinistreEvaluation> = {}): Promise<IResponse<SinistreEvaluation[]>> {   
    const result= await this.sinistreEvaluationService.findAllPaginated(pagination,options);
    return successPaginated<SinistreEvaluation>(result)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère un sinistreEvaluation par ID' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise< IResponse<SinistreEvaluation>> {
    const result= await this.sinistreEvaluationService.findOne(id);
    return success(result)
  }

  @Post()
  @Roles('SINISTRE') // Seuls les gestionnaires sinistreEvaluations peuvent accéder ici
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crée une nouvelle sinistreEvaluation' })
  async create(@Body() sinistreEvaluation: Partial<SinistreEvaluation>): Promise<IResponse> {
    // return this.sinistreEvaluationService.create(sinistreEvaluation);
    const result= await this.sinistreEvaluationService.create(sinistreEvaluation);
    return success(result)
  }

  @Put(':id')
  @Roles('SINISTRE') // Seuls les gestionnaires sinistreEvaluations peuvent accéder ici
  @ApiOperation({ summary: 'Met à jour une sinistreEvaluation' })
  async update(@Param('id', ParseIntPipe) id: number, 
        @Body() sinistreEvaluation: Partial<SinistreEvaluation>): Promise<IResponse> {
    // return this.sinistreEvaluationService.update(id, sinistreEvaluation);
     const result= await this.sinistreEvaluationService.create(sinistreEvaluation);
    return success(result)
  }

  @Delete(':id')
  @Roles('SINISTRE') // Seuls les gestionnaires sinistreEvaluations peuvent accéder ici
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprime une sinistreEvaluation' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<IResponse> {
    await this.sinistreEvaluationService.remove(id);
    return { success: true, message: OPERATION_SUCCES };
  }
}