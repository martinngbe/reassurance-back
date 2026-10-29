import {
  Controller,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindManyOptions, Like } from 'typeorm';
import { CrudController } from 'src/common/crud/crud.controller';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CompteRubrique } from '../entities/compte-rubrique.entity';
import { CompteRubriqueService } from '../services/compte-rubrique.service';
import { CreateCompteRubriqueDto } from '../dto/create-compte-rubrique.dto';
import { UpdateCompteRubriqueDto } from '../dto/update-compte-rubrique.dto';
import { NatureOffre } from 'src/referentiel/entities/nature-offre.entity';

@ApiTags('Métier Flux Financier - CompteRubrique')
@Controller('compte-rubrique')
@UseGuards(RolesGuard)
export class CompteRubriqueController extends CrudController<CompteRubrique, CreateCompteRubriqueDto, UpdateCompteRubriqueDto> {
  constructor(private readonly compteService: CompteRubriqueService) {super(compteService);}


   // 2. Définir les champs textuels recherchables (exclut id, created_at, branche_id, etc.)
    private readonly SEARCHABLE_FIELDS: (keyof CompteRubrique)[] = [
      'code', 'libelle', 'isProportionnel', 'isNonProportionnel' ]; 
    // Ajoutez d'autres champs texte ici si votre entité en possède (ex: 'description')
  
    protected buildOptions(query: any): FindManyOptions<CompteRubrique> {
      const baseSort: any = {libelle: 'ASC'};// Tri par défaut
      const options: FindManyOptions<CompteRubrique> = {
        where: {},
        order: {}, 
      };
      
      if( query.sortKey && query.sortDirection){          
          options.order ={ [query.sortKey]: `${query.sortDirection}`}
      }else {
        options.order = baseSort
      }
  
      // 3. Filtres exacts (AND)
      const baseWhere: any = {};      
      if (query.isProportionnelle) {
         baseWhere.isProportionnelle = query.isProportionnelle==='true';
       }
       if (query.isNonProportionnel ) {
         baseWhere.isNonProportionnel = query.isNonProportionnel==='true';
       } 
      // 4. Filtre de recherche globale (LIKE avec OR)
      if (query.search) {
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
        // Pas de recherche textuelle, on applique seulement les filtres exacts
        options.where = baseWhere;
      }
  
      console.log("options:", options);
      return options;
    }

}