import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from '../../common/crud/crud.controller';
import { Pays } from '../entities/pays.entity';
import { PaysService } from '../services/pays.service';
import { CreatePaysDto } from '../dto/create-pays.dto';
import { UpdatePaysDto } from '../dto/update-pays.dto';
import { FindManyOptions } from 'typeorm';

@ApiTags('Pays')
@Controller('pays')
export class PaysController extends CrudController<Pays, CreatePaysDto, UpdatePaysDto> {
  constructor(service: PaysService) {
    super(service);
  }
 // les diffentes options ou filtre pour 
       protected buildOptions(query: any): FindManyOptions<Pays> {
         console.log("________________________________");
         console.log("PaysController.buildOptions");
         console.log("query:", query);
         console.log("________________________________");
 
         // 1. Initialisation de base
         const options: FindManyOptions<Pays> = {
           order: { libelle: 'ASC' }, // Tri par défaut
         };
         // 2. Construction dynamique du where (évite les erreurs de typage TS strict)
         const whereCondition: any = {};
         if (query.regionId) {
           // Ajout du radix 10 pour parseInt (bonne pratique)
           whereCondition.region = { id: parseInt(query.regionId, 10) };
         }
         // 3. Assignation finale
         options.where = whereCondition;        
         console.log("options:", options);
         return options;
       }
}
