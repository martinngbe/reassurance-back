import {
  Controller, Get,  Param,  ParseIntPipe,  Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { CrudController } from 'src/common/crud/crud.controller';
import { FindManyOptions } from 'typeorm';
import { CreateQuittanceCessionDto } from '../dto/create-quittance-cession.dto';
import { UpdateQuittanceCessionDto } from '../dto/update-quittance-cession.dto';
import { QuittanceCession } from '../entities/quittance-cession.entity';
import { QuittanceCessionService } from '../services/quittance-cession.service';

@ApiTags('Métier Affaires - QuittanceCessions')
@Controller('quittance-cession')
export class QuittanceCessionController extends CrudController<QuittanceCession, CreateQuittanceCessionDto, UpdateQuittanceCessionDto> {
  constructor(private readonly quittanceCessionService: QuittanceCessionService) 
  {  super(quittanceCessionService);}

   // les quittanceCessions seront affichées par ordre de la plus récentes
   protected buildOptions(query: any): FindManyOptions<QuittanceCession> {
      const options: FindManyOptions<QuittanceCession> = {
        where: {},
        order: { createdAt: 'DESC' }, // Tri par défaut
      };
      return options;
    }
  

  @Patch(':id/annuler')
  @ApiOperation({ summary: 'Annule une quittanceCession' })
  annuler(@Param('id', ParseIntPipe) id: number): Promise<QuittanceCession> {
    //return this.quittanceCessionService.annuler(id);
    return this.quittanceCessionService.findOne(0)
  }
}