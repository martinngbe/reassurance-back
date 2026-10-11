import {
  Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe,
  HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SinistreReglement } from '../entities/sinistre-reglement.entity';
import { SinistreReglementService } from '../services/sinistre-reglement.service';
import { IResponse, PaginationParams } from 'src/common/crud/crud.service';
import { FindManyOptions } from 'typeorm';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('Sinistres - Règlements')
@Controller('sinistre-reglement')
export class SinistreReglementController {
  constructor(private readonly sinistreReglementService: SinistreReglementService) {}

  @Get()
  @ApiOperation({ summary: 'Liste tous les règlements de sinistre' })
  async findAll(  
    pagination: PaginationParams = {},
    options: FindManyOptions<SinistreReglement> = {}): Promise<IResponse> {   
    return this.sinistreReglementService.findAll(pagination,options);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère un règlement de sinistre par ID' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<IResponse> {
    return this.sinistreReglementService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles('GESTIONNAIRE-SINSITRE') // seul le gestionnaire sinistre est habillité
  @ApiOperation({ summary: 'Crée un nouveau règlement de sinistre' })
  create(@Body() reglement: Partial<SinistreReglement>): Promise<IResponse> {
    return this.sinistreReglementService.create(reglement);
  }

  @Put(':id')
  @Roles('GESTIONNAIRE-SINSITRE') // seul le gestionnaire sinistre est habillité
  @ApiOperation({ summary: 'Met à jour un règlement de sinistre' })
  update(@Param('id', ParseIntPipe) id: number, @Body() reglement: Partial<SinistreReglement>): Promise<IResponse> {
    return this.sinistreReglementService.update(id, reglement);
  }

  @Delete(':id')
  @Roles('GESTIONNAIRE-SINSITRE') // seul le gestionnaire sinistre est habillité
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprime un règlement de sinistre' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.sinistreReglementService.remove(id);
  }
}