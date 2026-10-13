import {
  Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe,
  HttpCode, HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindManyOptions } from 'typeorm';
import { CrudController } from 'src/common/crud/crud.controller';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateNoteDebitCreditDto } from '../dto/create-note-debit-credit.dto';
import { UpdateNoteDebitCreditDto } from '../dto/update-note-debit-credit.dto';
import { NoteDebitCredit } from '../entities/note-debit-credit.entity';
import { NoteDebitCreditService } from '../services/note-debit-credit.service';

@ApiTags('Métier Flux Financier - NoteDebitCredit')
@Controller('note-debit-credit')
@UseGuards(RolesGuard)
export class NoteDebitCreditController extends CrudController<NoteDebitCredit, CreateNoteDebitCreditDto, UpdateNoteDebitCreditDto> {
  constructor(private readonly noteDebitCreditService: NoteDebitCreditService) {super(noteDebitCreditService);}

  protected buildOptions(query: any): FindManyOptions<NoteDebitCredit> {
    const options: FindManyOptions<NoteDebitCredit> = {
      where: {},
      order: { createdAt: 'DESC' }, // Tri par défaut
    };
    return options;
  }

}