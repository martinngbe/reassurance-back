import {
  Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe,
  HttpCode, HttpStatus, Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CompteTraiteDetailService } from '../services/compte-traite-detail.service';
import { IResponse, PaginationParams } from 'src/common/crud/crud.service';
import { FindManyOptions } from 'typeorm';
import { CompteTraiteDetail } from '../entities/compte-traite-detail.entity';

@ApiTags('Métier Flux Financier - Comptes Traité')
@Controller('compte-traite-detail')
export class compteTraiteDetailController {
  constructor(private readonly compteTraiteDetailService: CompteTraiteDetailService) {}

  @Get()
  @ApiOperation({ summary: 'Liste tous les comptes traité' })
  //findAll(@Query('acteurId') acteurId?: number): Promise<IResponse> {
  findAll(
        pagination: PaginationParams = {},
        options: FindManyOptions<CompteTraiteDetail> = {},): Promise<IResponse> {
      
    //if (acteurId) return this.compteTraiteDetailService.findByActeur(acteurId);
    return this.compteTraiteDetailService.findAll(pagination,options);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère un compte traité par ID' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<IResponse> {
    return this.compteTraiteDetailService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crée un nouveau compte traité' })
  create(@Body() compteTraiteDetail: Partial<CompteTraiteDetail>): Promise<IResponse> {
    return this.compteTraiteDetailService.create(compteTraiteDetail);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Met à jour un compte traité' })
  update(@Param('id', ParseIntPipe) id: number, @Body() compteTraiteDetail: Partial<CompteTraiteDetail>): Promise<IResponse> {
    return this.compteTraiteDetailService.update(id, compteTraiteDetail);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprime un compte traité' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.compteTraiteDetailService.remove(id);
  }
}