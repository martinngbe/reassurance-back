// import {
//   Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe,
//   HttpCode, HttpStatus, Query, Patch,
// } from '@nestjs/common';
// import { ApiTags, ApiOperation } from '@nestjs/swagger';
// import { QuittanceService } from '../services/quittance.service';
// import { Quittance } from '../entities/quittance.entity';

// @ApiTags('Métier Affaires - Quittances')
// @Controller('quittances')
// export class QuittanceController {
//   constructor(private readonly quittanceService: QuittanceService) {}

//   @Get()
//   @ApiOperation({ summary: 'Liste toutes les quittances' })
//   findAll(@Query('policeId') policeId?: number): Promise<Quittance[]> {
//     if (policeId) return this.quittanceService.findByPolice(policeId);
//     return this.quittanceService.findAll();
//   }

//   @Get(':id')
//   @ApiOperation({ summary: 'Récupère une quittance par ID' })
//   findOne(@Param('id', ParseIntPipe) id: number): Promise<Quittance> {
//     return this.quittanceService.findOne(id);
//   }

//   @Post()
//   @HttpCode(HttpStatus.CREATED)
//   @ApiOperation({ summary: 'Crée une nouvelle quittance' })
//   create(@Body() quittance: Partial<Quittance>): Promise<Quittance> {
//     return this.quittanceService.create(quittance);
//   }

//   @Put(':id')
//   @ApiOperation({ summary: 'Met à jour une quittance' })
//   update(@Param('id', ParseIntPipe) id: number, @Body() quittance: Partial<Quittance>): Promise<Quittance> {
//     return this.quittanceService.update(id, quittance);
//   }

//   @Patch(':id/annuler')
//   @ApiOperation({ summary: 'Annule une quittance' })
//   annuler(@Param('id', ParseIntPipe) id: number): Promise<Quittance> {
//     return this.quittanceService.annuler(id);
//   }

//   @Delete(':id')
//   @HttpCode(HttpStatus.NO_CONTENT)
//   @ApiOperation({ summary: 'Supprime une quittance' })
//   remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
//     return this.quittanceService.remove(id);
//   }
// }