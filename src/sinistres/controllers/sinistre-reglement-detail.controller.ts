import {
  Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe,
  HttpCode, HttpStatus, Query, Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FindManyOptions } from 'typeorm';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { IResponse,   PaginationParams } from 'src/common/interfaces/response.interface';
import { OPERATION_SUCCES, success, successPaginated } from 'src/common/helper/response.helper';
import { SinistreReglementDetail } from '../entities/sinistre-reglement-detail.entity';
import { SinistreReglementDetailService } from '../services/sinistre-reglement-detail.service';

@ApiTags('SinistreReglementDetail')
@Controller('sinistre-reglement-detail')
export class SinistreReglementDetailController {
  constructor(private readonly sinistreReglementService: SinistreReglementDetailService) {}

  @Get()
  @ApiOperation({ summary: 'Liste tous les sinistreReglementDetails par page' })
  async findAll(  
    pagination: PaginationParams = {},
    options: FindManyOptions<SinistreReglementDetail> = {}): Promise<IResponse<SinistreReglementDetail[]>> {   
    const result= await this.sinistreReglementService.findAllPaginated(pagination,options);
    return successPaginated<SinistreReglementDetail>(result)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère un sinistreReglement par ID' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise< IResponse<SinistreReglementDetail>> {
    const result= await this.sinistreReglementService.findOne(id);
    return success(result)
  }

  @Post()
  @Roles('SINISTRE') // Seuls les gestionnaires sinistreReglements peuvent accéder ici
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crée une nouvelle sinistreReglement' })
  async create(@Body() sinistreReglement: Partial<SinistreReglementDetail>): Promise<IResponse> {
    // return this.sinistreReglementService.create(sinistreReglement);
    const result= await this.sinistreReglementService.create(sinistreReglement);
    return success(result)
  }

  @Put(':id')
  @Roles('SINISTRE') // Seuls les gestionnaires sinistreReglements peuvent accéder ici
  @ApiOperation({ summary: 'Met à jour une sinistreReglement' })
  async update(@Param('id', ParseIntPipe) id: number, 
        @Body() sinistreReglement: Partial<SinistreReglementDetail>): Promise<IResponse> {
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