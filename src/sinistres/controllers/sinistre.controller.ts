import {
  Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe,
  HttpCode, HttpStatus, Query, Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SinistreService } from '../services/sinistre.service';
import { Sinistre } from '../entities/sinistre.entity';
import { FindManyOptions } from 'typeorm';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { IResponse,   PaginationParams } from 'src/common/interfaces/response.interface';
import { OPERATION_SUCCES, success, successPaginated } from 'src/common/helper/response.helper';

@ApiTags('Sinistre')
@Controller('sinistre')
export class SinistreController {
  constructor(private readonly sinistreService: SinistreService) {}

  @Get()
  @ApiOperation({ summary: 'Liste tous les sinistres par page' })
  async findAll(  
    pagination: PaginationParams = {},
    options: FindManyOptions<Sinistre> = {}): Promise<IResponse<Sinistre[]>> {   
    const result= await this.sinistreService.findAllPaginated(pagination,options);
    return successPaginated<Sinistre>(result)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère un sinistre par ID' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise< IResponse<Sinistre>> {
    const result= await this.sinistreService.findOne(id);
    return success(result)
  }

  @Post()
  @Roles('SINISTRE') // Seuls les gestionnaires sinistres peuvent accéder ici
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crée une nouvelle sinistre' })
  async create(@Body() sinistre: Partial<Sinistre>): Promise<IResponse> {
    // return this.sinistreService.create(sinistre);
    const result= await this.sinistreService.create(sinistre);
    return success(result)
  }

  @Put(':id')
  @Roles('SINISTRE') // Seuls les gestionnaires sinistres peuvent accéder ici
  @ApiOperation({ summary: 'Met à jour une sinistre' })
  async update(@Param('id', ParseIntPipe) id: number, 
        @Body() sinistre: Partial<Sinistre>): Promise<IResponse> {
    // return this.sinistreService.update(id, sinistre);
     const result= await this.sinistreService.create(sinistre);
    return success(result)
  }

  @Delete(':id')
  @Roles('SINISTRE') // Seuls les gestionnaires sinistres peuvent accéder ici
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprime une sinistre' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<IResponse> {
    await this.sinistreService.remove(id);
    return { success: true, message: OPERATION_SUCCES };
  }
}