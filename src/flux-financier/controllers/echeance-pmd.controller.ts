import {
  Controller,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindManyOptions, IsNull } from 'typeorm';
import { CrudController } from 'src/common/crud/crud.controller';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateEcheancePmdDto } from 'src/quittances/dto/create-echeance-pmd.dto';
import { UpdateEcheancePmdDto } from 'src/quittances/dto/update-echeance-pmd.dto';
import { EcheancePmd } from '../entities/echeance-pmd.entity';
import { EcheancePmdService } from '../services/echeance-pmd.service';

@ApiTags('Métier Flux Financier - EcheancePmd')
@Controller('echeance-pmd')
@UseGuards(RolesGuard)
export class EcheancePmdController extends CrudController<EcheancePmd, CreateEcheancePmdDto, UpdateEcheancePmdDto> {
  constructor(private readonly echeancePmdService: EcheancePmdService) {super(echeancePmdService);}

     protected buildOptions(query: any): FindManyOptions<EcheancePmd> {        
            console.log("_____________________________________")
            console.log("EcheancePmdController.buildOptions")
            console.log("query:",query)
            console.log("_____________________________________")
            
            const options: FindManyOptions<EcheancePmd> = {
              where: {},
              order: {}, 
            };
            const baseSort: any = { createdAt: 'desc'  };// Tri par défaut
            if( query.sortKey && query.sortDirection){
                options.order ={ [query.sortKey]: `${query.sortDirection}`}
            }else {
              options.order = baseSort
            }   

            //  Filtres exacts (AND)
            const baseWhere: any = {};
              // 2. Gestion du filtre assureId (null ou valeur spécifique)
            if ( !query.quittanceId || query.quittanceId === 'null' || query.quittanceId === null) {
              // Filtre pour récupérer les polices SANS assure
              baseWhere.quittance = IsNull(); 
              
            } else if (query.quittanceId) {
              // Filtre pour un assure spécifique
              baseWhere.quittance = { id: parseInt(query.quittanceId, 10) };               
            }

   

            console.log("baseWhere:",baseWhere)
            options.where = baseWhere

            console.log("options:",options)
            console.log("_____________________________________")
          
            return options;
      }

}