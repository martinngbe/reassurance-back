import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { PaginationParams, IResponse, OPERATION_SUCCES, OPERATION_ECHEC } from 'src/common/crud/crud.service';
import { NoteDebitCredit } from '../entities/note-debit-credit.entity';

@Injectable()
export class NoteDebitCreditService {
  constructor(
    @InjectRepository(NoteDebitCredit)
    private noteDebitCreditRepository: Repository<NoteDebitCredit>,
  ) {}

 
    /**
     * Récupère les entités avec pagination.
     * @param pagination Objet contenant page et limit
     * @param options Options TypeORM classiques (where, relations, order...)
     */
  async findAll(
    pagination: PaginationParams = {},
    options: FindManyOptions<NoteDebitCredit> = {},
    ): Promise<IResponse> {
    const page = pagination.page && pagination.page > 0 ? pagination.page : 1;
    const limit = pagination.limit && pagination.limit > 0 ? pagination.limit : 10;
    const skip = (page - 1) * limit;

    const [data, total] = await this.noteDebitCreditRepository.findAndCount({
      ...options,
      skip,
      take: limit,
      order: {
      createdAt: 'DESC',
    },
    });

    return {
      success: true,
      data,
      pageInfo: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        }
    } ;
  }
 async  findOne(id: number): Promise<IResponse> {
    const noteDebitCredit = await  this.noteDebitCreditRepository.findOneOrFail({
      where: { id } });
    if(!noteDebitCredit)  
      return {
        success:false,
        message: `NoteDebitCredit N° ${id} est introuvable`
    }
     return {
        success:true,
        data:noteDebitCredit,
        message: OPERATION_SUCCES
    }
  }


  async create(noteDebitCredit: Partial<NoteDebitCredit>): Promise<IResponse> {
    const newEval = this.noteDebitCreditRepository.create(noteDebitCredit);
    const save = await this.noteDebitCreditRepository.save(newEval);
    if(!save) return{
      success:false,
      message:OPERATION_ECHEC
    }
    return {
      success:true,
      data:save,
      message:OPERATION_SUCCES
    }
  }

  async update(id: number, noteDebitCredit: Partial<NoteDebitCredit>): Promise<IResponse> {
    const existing = await this.findOne(id);
    if (!existing.success)  return existing;
      //throw new NotFoundException(`NoteDebitCredit ${id} not found`);
    Object.assign(existing.data, noteDebitCredit);
    const save = await this.noteDebitCreditRepository.save(existing.data);
    return {
      success:true,
      data: save,
      message:OPERATION_SUCCES
    }
  }

  async remove(id: number): Promise<void> {
    await this.noteDebitCreditRepository.delete(id);
    //const result = await this.noteDebitCreditRepository.delete(id);
   // if (result.affected === 0) throw new NotFoundException(`NoteDebitCredit ${id} not found`);
  }
}