import {
  Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe,
  HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { IResponse, PaginationParams } from 'src/common/crud/crud.service';
import { FindManyOptions } from 'typeorm';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ReglementDetail } from '../entities/reglement-detail.entity';
import { ReglementDetailService } from '../services/reglement-detail.service';

@ApiTags('Métier Flux Financier - Règlements')
@Controller('reglement-detail')
export class ReglementDetailController {
  constructor(private readonly reglementDetailService: ReglementDetailService) {}

  @Get()
  @ApiOperation({ summary: 'Liste tous les règlements' })
  findAll( pagination: PaginationParams = {},
      options: FindManyOptions<ReglementDetail> = {},): Promise<IResponse> {
    return this.reglementDetailService.findAll(pagination,options);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère un règlement par ID' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<IResponse> {
    return this.reglementDetailService.findOne(id);
  }

  @Post()
  @Roles('COMPTABILITE')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crée un nouveau règlement' })
  create(@Body() reglementDetailDetail: Partial<ReglementDetail>): Promise<IResponse> {
    return this.reglementDetailService.create(reglementDetailDetail);
  }

  @Put(':id')
  @Roles('COMPTABILITE')
  @ApiOperation({ summary: 'Met à jour un règlement' })
  update(@Param('id', ParseIntPipe) id: number, @Body() reglementDetailDetail: Partial<ReglementDetail>): Promise<IResponse> {
    return this.reglementDetailService.update(id, reglementDetailDetail);
  }

  @Delete(':id')
  @Roles('COMPTABILITE')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprime un règlement' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.reglementDetailService.remove(id);
  }
}