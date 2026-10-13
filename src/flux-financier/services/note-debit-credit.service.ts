import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { 
  CrudService, 
} from '../../common/crud/crud.service';
import { NoteDebitCredit } from '../entities/note-debit-credit.entity';

@Injectable()
export class NoteDebitCreditService extends CrudService<NoteDebitCredit> {
  constructor(@InjectRepository(NoteDebitCredit) repository: Repository<NoteDebitCredit>) {
    super(repository);
  }
 
}