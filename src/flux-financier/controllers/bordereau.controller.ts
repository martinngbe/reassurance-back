import {
  Controller,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindManyOptions, IsNull } from 'typeorm';
import { CrudController } from 'src/common/crud/crud.controller';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateBordereauDto } from '../dto/create-bordereau.dto';
import { UpdateBordereauDto } from '../dto/update-bordereau.dto';
import { Bordereau } from '../entities/bordereau.entity';
import { BordereauService } from '../services/bordereau.service';

@ApiTags('Métier Flux Financier - Bordereau')
@Controller('bordereau')
@UseGuards(RolesGuard)
export class BordereauController extends CrudController<Bordereau, CreateBordereauDto, UpdateBordereauDto> {
  constructor(private readonly compteDetailService: BordereauService) {super(compteDetailService);}

     // les diffentes options ou filtre pour 
      protected buildOptions(query: any): FindManyOptions<Bordereau> {        
            console.log("_____________________________________")
            console.log("BordereauController.buildOptions")
            console.log("query:",query)
            console.log("_____________________________________")
            
            const options: FindManyOptions<Bordereau> = {
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