import { Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from 'src/common/crud/crud.controller';
import { CreatePoliceDto } from '../dto/create-police.dto';
import { UpdatePoliceDto } from '../dto/update-police.dto';
import { Police } from '../entities/police.entity';
import { FindManyOptions, IsNull, Like } from 'typeorm';
import { PoliceService } from '../services/police.service';

@ApiTags('Police')
@Controller('police')
export class PoliceController extends CrudController<Police, CreatePoliceDto, UpdatePoliceDto> {
  constructor(protected readonly service: PoliceService) {
    super(service);
  }

       private readonly SEARCHABLE_FIELDS: (keyof Police)[] = ['numero'];
      
     // les diffentes options ou filtre pour 
      protected buildOptions(query: any): FindManyOptions<Police> {        
            console.log("_____________________________________")
            console.log("PoliceController.buildOptions")
            console.log("query:",query)
            console.log("_____________________________________")
            
            const options: FindManyOptions<Police> = {
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
            if ( !query.assureId || query.assureId === 'null' || query.assureId === null) {
              // Filtre pour récupérer les polices SANS assure
              baseWhere.assure = IsNull(); 
              
            } else if (query.assureId) {
              // Filtre pour un assure spécifique
              baseWhere.assure = { id: parseInt(query.assureId, 10) };               
            }
             ////////////           
            if (query.cedanteId) {
              // Filtre pour une cédante spécifique
              baseWhere.acteurCedante = { id: parseInt(query.cedanteId, 10) };               
            }

            /////////
            if (query.isCession ) {
              baseWhere.isCession = query.isCession==='true';
            }  
             if (query.isFac ) {
              baseWhere.isFac = query.isFac==='true';
            } 


                  // 5. Filtre de recherche globale (LIKE avec OR)
            if (query.search && this.SEARCHABLE_FIELDS.length > 0) {
              const searchTerm = `%${query.search}%`;      
              const searchConditions = this.SEARCHABLE_FIELDS.map(field => ({
                ...baseWhere, // ✅ Préserve les filtres de relations (police, natureOffre)
                [field]: Like(searchTerm),
              }));
              options.where = searchConditions;
            } else {
              options.where = baseWhere;
            }

            console.log("police baseWhere:",baseWhere)
            console.log("police options:",options)
          
            return options;
      }

    
}
