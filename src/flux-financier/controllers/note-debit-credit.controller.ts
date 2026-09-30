import {
  Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe,
  HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { NoteDebitCreditService } from '../services/note-debit-credit.service';
import { NoteDebitCredit } from '../entities/note-debit-credit.entity';

@ApiTags('Métier Flux Financier - Notes Débit/Crédit')
@Controller('notes-debit-credit')
export class NoteDebitCreditController {
  constructor(private readonly ndcService: NoteDebitCreditService) {}

  @Get()
  @ApiOperation({ summary: 'Liste toutes les notes débit/crédit' })
  findAll(): Promise<NoteDebitCredit[]> {
    return this.ndcService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère une note débit/crédit par ID' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<NoteDebitCredit> {
    return this.ndcService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crée une nouvelle note débit/crédit' })
  create(@Body() ndc: Partial<NoteDebitCredit>): Promise<NoteDebitCredit> {
    return this.ndcService.create(ndc);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Met à jour une note débit/crédit' })
  update(@Param('id', ParseIntPipe) id: number, @Body() ndc: Partial<NoteDebitCredit>): Promise<NoteDebitCredit> {
    return this.ndcService.update(id, ndc);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprime une note débit/crédit' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.ndcService.remove(id);
  }
}