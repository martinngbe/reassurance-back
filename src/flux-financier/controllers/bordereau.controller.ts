import {
  Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe,
  HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { BordereauService } from '../services/bordereau.service';
import { Bordereau } from '../entities/bordereau.entity';

@ApiTags('Métier Flux Financier - Bordereaux')
@Controller('bordereaux')
export class BordereauController {
  constructor(private readonly bordereauService: BordereauService) {}

  @Get()
  @ApiOperation({ summary: 'Liste tous les bordereaux' })
  findAll(): Promise<Bordereau[]> {
    return this.bordereauService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère un bordereau par ID' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Bordereau> {
    return this.bordereauService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crée un nouveau bordereau' })
  create(@Body() bordereau: Partial<Bordereau>): Promise<Bordereau> {
    return this.bordereauService.create(bordereau);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Met à jour un bordereau' })
  update(@Param('id', ParseIntPipe) id: number, @Body() bordereau: Partial<Bordereau>): Promise<Bordereau> {
    return this.bordereauService.update(id, bordereau);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprime un bordereau' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.bordereauService.remove(id);
  }
}