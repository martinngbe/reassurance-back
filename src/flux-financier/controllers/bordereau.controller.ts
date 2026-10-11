import {
  Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe,
  HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { BordereauService } from '../services/bordereau.service';
import { Bordereau } from '../entities/bordereau.entity';
import { IResponse, PaginationParams } from 'src/common/crud/crud.service';
import { FindManyOptions } from 'typeorm';

@ApiTags('Métier Flux Financier - Bordereaux')
@Controller('bordereau')
export class BordereauController {
  constructor(private readonly bordereauService: BordereauService) {}

  @Get()
  @ApiOperation({ summary: 'Liste tous les bordereaux' })
  findAll(
        pagination: PaginationParams = {},
        options: FindManyOptions<Bordereau> = {},
  ): Promise<IResponse> {
    return this.bordereauService.findAll(pagination,options);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère un bordereau par ID' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<IResponse> {
    return this.bordereauService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crée un nouveau bordereau' })
  create(@Body() bordereau: Partial<Bordereau>): Promise<IResponse> {
    return this.bordereauService.create(bordereau);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Met à jour un bordereau' })
  update(@Param('id', ParseIntPipe) id: number, @Body() bordereau: Partial<Bordereau>): Promise<IResponse> {
    return this.bordereauService.update(id, bordereau);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprime un bordereau' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.bordereauService.remove(id);
  }
}