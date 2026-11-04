import {
  Controller, Get,  Param,  ParseIntPipe,  Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { QuittanceService } from '../services/quittance.service';
import { Quittance } from '../entities/quittance.entity';

import { CrudController } from 'src/common/crud/crud.controller';
import { CreateQuittanceDto } from '../dto/create-quittance.dto';
import { UpdateQuittanceDto } from '../dto/update-quittance.dto';
import { FindManyOptions, Like } from 'typeorm';

@ApiTags('Métier Affaires - Quittances')
@Controller('quittance')
export class QuittanceController extends CrudController<Quittance, CreateQuittanceDto, UpdateQuittanceDto> {
  constructor(private readonly quittanceService: QuittanceService) 
  {  super(quittanceService);}

    private readonly SEARCHABLE_FIELDS: (keyof Quittance)[] = ['numero', 'dateEffet', 'dateEcheance']; 
    // Ajoutez d'autres champs texte ici si votre entité en possède (ex: 'description')
   // les quittances seront affichées par ordre de la plus récentes
   protected buildOptions(query: any): FindManyOptions<Quittance> {
      const options: FindManyOptions<Quittance> = {
        where: {},
        order: {}, // Tri par défaut
      };
      const baseSort: any = { createdAt: 'DESC'  };// Tri par défaut
      if( query.sortKey && query.sortDirection){
          options.order ={ [query.sortKey]: `${query.sortDirection}`}
      }else {
        options.order = baseSort
      }   

      // filtre sur un champs spécifique; Tableau de conditions
      //==========================================================
      // La liste des quittances dont policeId=query.policeId
      //==========================================================
      const baseWhere: any = {};
      if (query.policeId) {
        baseWhere.police = { id: parseInt(query.policeId, 10) }; 
      }
      // ==========================================================
      // AJOUT : Filtrage sur isCession de la police associée
      // La liste des quittance dont police.isCession= vrai ou faut
      // ==========================================================
      if (query.isCession !== undefined) {
        if (!baseWhere.police) {
          baseWhere.police = {};
        }
        // Conversion de la valeur (qui arrive en string depuis l'URL) en booléen
        baseWhere.police.isCession = query.isCession === 'true' || query.isCession === true;
      }
      
    // 4. Filtre de recherche globale (LIKE avec OR)
    if (query.search && this.SEARCHABLE_FIELDS.length > 0) {
      const searchTerm = `%${query.search}%`;      
      // On génère un tableau de conditions : 
      // [{ branche: {id: 3}, code: Like('%x%') }, { branche: {id: 3}, libelle: Like('%x%') }]
      // TypeORM interprétera ce tableau comme : (branche=3 AND code LIKE '%x%') OR (branche=3 AND libelle LIKE '%x%')
      const searchConditions = this.SEARCHABLE_FIELDS.map(field => ({
        ...baseWhere,
        [field]: Like(searchTerm),
      }));

      options.where = searchConditions;
    } else {
      options.where = baseWhere
    }

      

      console.log("options:",options)
      console.log("_____________________________________")

      return options;
    }
  

  @Patch(':id/annuler')
  @ApiOperation({ summary: 'Annule une quittance' })
  annuler(@Param('id', ParseIntPipe) id: number): Promise<Quittance> {
    //return this.quittanceService.annuler(id);
    return this.quittanceService.findOne(0)
  }
}