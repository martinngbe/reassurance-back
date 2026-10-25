import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from '../../common/crud/crud.service';
import { Mouvement } from '../entities/mouvement.entity';
import { IResponse } from 'src/common/interfaces/response.interface';
import { failure, success } from 'src/common/helper/response.helper';

@Injectable()
export class MouvementService extends CrudService<Mouvement> {
  constructor(@InjectRepository(Mouvement) repository: Repository<Mouvement>) {
    super(repository);
  }

/**
   * Récupère un mouvement par son code
   */
  async findByCode(code: string): Promise<Mouvement> {
    const mouvement = await this.repository.findOne({ where: { code } });
    
    if (!mouvement) {
      throw new NotFoundException(
        failure(`Mouvement avec le code "${code}" introuvable`)
      );
    }
    
    return mouvement;
  }
 
}
