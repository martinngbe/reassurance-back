import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from '../../common/crud/crud.controller';
import { FindManyOptions, Like } from 'typeorm';
import { CreateNatureOffreDto } from '../dto/create-nature-offre.dto';
import { UpdateNatureOffreDto } from '../dto/update-nature-offre.dto';
import { NatureOffre } from '../entities/nature-offre.entity';
import { NatureOffreService } from '../services/nature-offre.service';

@ApiTags('NatureOffre')
@Controller('nature-offre')
export class NatureOffreController extends CrudController<NatureOffre, CreateNatureOffreDto, UpdateNatureOffreDto> {
  constructor(service: NatureOffreService) {
    super(service);
  }


   // 2. Définir les champs textuels recherchables (exclut id, created_at, branche_id, etc.)
    private readonly SEARCHABLE_FIELDS: (keyof NatureOffre)[] = [
      'code', 'libelle', 'isFacObligatoire', 'isFacultative' , 'isProportionnelle']; 
    // Ajoutez d'autres champs texte ici si votre entité en possède (ex: 'description')
  
    protected buildOptions(query: any): FindManyOptions<NatureOffre> {
      const baseSort: any = {libelle: 'ASC'};// Tri par défaut
      const options: FindManyOptions<NatureOffre> = {
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
      // filtre sur un champs spécifique; Tableau de conditions
      //  if (query.brancheId) {
      //   baseWhere.branche = { id: parseInt(query.brancheId, 10) };
      //   // Note: Si votre entité utilise une colonne directe et non une relation, utilisez :
      //   // baseWhere.brancheId = parseInt(query.brancheId, 10);
      // }
      if (query.isProportionnelle) {
         baseWhere.isProportionnelle = query.isProportionnelle==='true';
       }
       if (query.isFacultative ) {
         baseWhere.isFacultative = query.isFacultative==='true';
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
