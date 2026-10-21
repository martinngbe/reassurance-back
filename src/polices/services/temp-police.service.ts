import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CrudService } from '../../common/crud/crud.service';
import { TempPolice } from '../entities/temp-police.entity';
import { LogMethod } from 'src/common/decorateur/log-method.decorator';

@Injectable()
export class TempPoliceService extends CrudService<TempPolice> {
  constructor(@InjectRepository(TempPolice) tempPolicerepository: Repository<TempPolice>) {
    super(tempPolicerepository);
  }


    /**
     * Crée une nouvelle entité.
     */
     @LogMethod()
    async create(dto: DeepPartial<TempPolice>): Promise<TempPolice> {
     
      const entity = this.repository.create(dto);
      return this.repository.save(entity);
    }
}
