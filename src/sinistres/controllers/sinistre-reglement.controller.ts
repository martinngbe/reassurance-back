import {
  Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe,
  HttpCode, HttpStatus, Query, Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FindManyOptions } from 'typeorm';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { IResponse,   PaginationParams } from 'src/common/interfaces/response.interface';
import { OPERATION_SUCCES, success, successPaginated } from 'src/common/helper/response.helper';
import { SinistreReglement } from '../entities/sinistre-reglement.entity';
import { SinistreReglementService } from '../services/sinistre-reglement.service';

@ApiTags('SinistreReglement')
@Controller('sinistre-reglement')
export class SinistreReglementController {
  constructor(private readonly sinistreReglementService: SinistreReglementService) {}

  @Get()
  @ApiOperation({ summary: 'Liste tous les sinistreReglements par page' })
  async findAll(  
    pagination: PaginationParams = {},
    options: FindManyOptions<SinistreReglement> = {}): Promise<IResponse<SinistreReglement[]>> {   
    const result= await this.sinistreReglementService.findAllPaginated(pagination,options);
    return successPaginated<SinistreReglement>(result)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère un sinistreReglement par ID' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise< IResponse<SinistreReglement>> {
    const result= await this.sinistreReglementService.findOne(id);
    return success(result)
  }

  @Post()
  @Roles('SINISTRE') // Seuls les gestionnaires sinistreReglements peuvent accéder ici
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crée une nouvelle sinistreReglement' })
  async create(@Body() sinistreReglement: Partial<SinistreReglement>): Promise<IResponse> {
    // return this.sinistreReglementService.create(sinistreReglement);
    const result= await this.sinistreReglementService.create(sinistreReglement);
    return success(result)
  }

  @Put(':id')
  @Roles('SINISTRE') // Seuls les gestionnaires sinistreReglements peuvent accéder ici
  @ApiOperation({ summary: 'Met à jour une sinistreReglement' })
  async update(@Param('id', ParseIntPipe) id: number, 
        @Body() sinistreReglement: Partial<SinistreReglement>): Promise<IResponse> {
    // return this.sinistreReglementService.update(id, sinistreReglement);
     const result= await this.sinistreReglementService.create(sinistreReglement);
    return success(result)
  }

  @Delete(':id')
  @Roles('SINISTRE') // Seuls les gestionnaires sinistreReglements peuvent accéder ici
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprime une sinistreReglement' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<IResponse> {
    await this.sinistreReglementService.remove(id);
    return { success: true, message: OPERATION_SUCCES };
  }
}