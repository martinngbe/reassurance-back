import {
  Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe,
  HttpCode, HttpStatus, Query, Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QuittanceService } from '../services/quittance.service';
import { Quittance } from '../entities/quittance.entity';

@ApiTags('Métier Affaires - Quittances')
@Controller('quittances')
export class QuittanceController {
  constructor(private readonly quittanceService: QuittanceService) {}

  @Get()
  @ApiOperation({ summary: 'Liste toutes les quittances' })
  findAll(@Query('policeId') policeId?: number): Promise<Quittance[]> {
    if (policeId) return this.quittanceService.findByPolice(policeId);
    return this.quittanceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère une quittance par ID' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Quittance> {
    return this.quittanceService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crée une nouvelle quittance' })
  create(@Body() quittance: Partial<Quittance>): Promise<Quittance> {
    return this.quittanceService.create(quittance);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Met à jour une quittance' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() quittance: Partial<Quittance>,
  ): Promise<Quittance> {
    return this.quittanceService.update(id, quittance);
  }

  @Patch(':id/annuler')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Annule une quittance et toutes ses entités liées',
    description: `
      Cette opération annule en cascade :
      - La Quittance elle-même
      - Les QuittanceCession associées
      - Les Bordereaux (directs et via cessions)
      - Les EcheancesPmd (directes et via cessions)
      - Les NotesDebitCredit (directes, via bordereaux, via échéances, via cessions)
      - Les Reglements et ReglementDetails liés aux NDC
      - Les SinistreEvaluationQuittances et leurs Cessions
      - Les SinistreQuittances
      - Les ObjetsAssurés
      
      Une copie miroir "annulée" est créée pour chaque entité.
      L'opération est atomique (transaction).
    `,
  })
  @ApiResponse({
    status: 200,
    description: 'Quittance annulée avec succès',
  })
  @ApiResponse({
    status: 400,
    description: 'Quittance déjà annulée',
  })
  @ApiResponse({
    status: 404,
    description: 'Quittance non trouvée',
  })
  annuler(@Param('id', ParseIntPipe) id: number): Promise<Quittance> {
    return this.quittanceService.annuler(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprime physiquement une quittance' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.quittanceService.remove(id);
  }
}