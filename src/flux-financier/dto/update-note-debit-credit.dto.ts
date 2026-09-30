import { PartialType } from '@nestjs/mapped-types';
import { CreateNoteDebitCreditDto } from './create-note-debit-credit.dto';

export class UpdateNoteDebitCreditDto extends PartialType(CreateNoteDebitCreditDto) {}
