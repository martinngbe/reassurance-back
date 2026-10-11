import {
  Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe,
  HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { IResponse, PaginationParams } from 'src/common/crud/crud.service';
import { FindManyOptions } from 'typeorm';
import { SinistreReglementDetailService } from '../services/sinistre-reglement-detail.service';
import { SinistreReglementDetail } from '../entities/sinistre-reglement-detail.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('Sinistres - Règlements')
@Controller('sinistre-reglement-detail')
export class SinistreReglementDetailController {
  constructor(private readonly sinistreReglementDetailService: SinistreReglementDetailService) {}

  @Get()
  @ApiOperation({ summary: 'Liste tous les règlements de sinistre' })
  async findAll(  
    pagination: PaginationParams = {},
    options: FindManyOptions<SinistreReglementDetail> = {}): Promise<IResponse> {   
    return this.sinistreReglementDetailService.findAll(pagination,options);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère un règlement de sinistre par ID' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<IResponse> {
    return this.sinistreReglementDetailService.findOne(id);
  }

  @Post()
  @Roles('GESTIONNAIRE-SINSITRE') // Seul le gestionnaire sinistre est habillité
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crée un nouveau règlement de sinistre' })
  create(@Body() reglement: Partial<SinistreReglementDetail>): Promise<IResponse> {
    return this.sinistreReglementDetailService.create(reglement);
  }

  @Put(':id')
  @Roles('GESTIONNAIRE-SINSITRE') // seul le gestionnaire sinistre est habillité
  @ApiOperation({ summary: 'Met à jour un règlement de sinistre' })
  update(@Param('id', ParseIntPipe) id: number, @Body() reglement: Partial<SinistreReglementDetail>): Promise<IResponse> {
    return this.sinistreReglementDetailService.update(id, reglement);
  }

  @Delete(':id')
  @Roles('GESTIONNAIRE-SINSITRE') // seul le gestionnaire sinistre est habillité
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprime un règlement de sinistre' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.sinistreReglementDetailService.remove(id);
  }
}