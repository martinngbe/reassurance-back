import {
  Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe,
  HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ReglementService } from '../services/reglement.service';
import { Reglement } from '../entities/reglement.entity';
import { IResponse, PaginationParams } from 'src/common/crud/crud.service';
import { FindManyOptions } from 'typeorm';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('Métier Flux Financier - Règlements')
@Controller('reglement')
export class ReglementController {
  constructor(private readonly reglementService: ReglementService) {}

  @Get()
  @ApiOperation({ summary: 'Liste tous les règlements' })
  findAll( pagination: PaginationParams = {},
      options: FindManyOptions<Reglement> = {},): Promise<IResponse> {
    return this.reglementService.findAll(pagination,options);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère un règlement par ID' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<IResponse> {
    return this.reglementService.findOne(id);
  }

  @Post()
  @Roles('COMPTABILITE')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crée un nouveau règlement' })
  create(@Body() reglement: Partial<Reglement>): Promise<IResponse> {
    return this.reglementService.create(reglement);
  }

  @Put(':id')
  @Roles('COMPTABILITE')
  @ApiOperation({ summary: 'Met à jour un règlement' })
  update(@Param('id', ParseIntPipe) id: number, @Body() reglement: Partial<Reglement>): Promise<IResponse> {
    return this.reglementService.update(id, reglement);
  }

  @Delete(':id')
  @Roles('COMPTABILITE')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprime un règlement' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.reglementService.remove(id);
  }
}