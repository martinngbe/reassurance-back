import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PoliceService } from '../services/police.service';
import { Police } from '../entities/police.entity';

@ApiTags('Référentiel - Polices')
@Controller('polices')
export class PoliceController {
  constructor(private readonly policeService: PoliceService) {}

  @Get()
  @ApiOperation({ summary: 'Liste toutes les polices' })
  findAll(): Promise<Police[]> {
    return this.policeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère une police par ID' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Police> {
    return this.policeService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crée une nouvelle police' })
  create(@Body() police: Partial<Police>): Promise<Police> {
    return this.policeService.create(police);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Met à jour une police' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() police: Partial<Police>,
  ): Promise<Police> {
    return this.policeService.update(id, police);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprime une police' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.policeService.remove(id);
  }
}