import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from '../../common/crud/crud.controller';


import { FindManyOptions, Like } from 'typeorm';
import { CreateCessionLegaleDto } from '../dto/create-cession-legale.dto';
import { UpdateCessionLegaleDto } from '../dto/update-cession-legale.dto';
import { CessionLegale } from '../entities/cession-legale.entity';
import { CessionLegaleService } from '../services/cession-legale.service';

@ApiTags('CessionLegale')
@Controller('cession-legale')
export class CessionLegaleController extends CrudController<CessionLegale, CreateCessionLegaleDto, UpdateCessionLegaleDto> {
  constructor(service: CessionLegaleService) {
    super(service);
  }

  // 2. Définir les champs textuels recherchables (exclut id, created_at, branche_id, etc.)
  private readonly SEARCHABLE_FIELDS: (keyof CessionLegale)[] = ['taux', 'isFac']; 
  // Ajoutez d'autres champs texte ici si votre entité en possède (ex: 'description')

  protected buildOptions(query: any): FindManyOptions<CessionLegale> {
    const baseSort: any = {};// Tri par défaut
    const options: FindManyOptions<CessionLegale> = {
      where: {},
      order: {}, 
      relations: ['acteur'], 
        // ✅ AJOUT : Indispensable pour filtrer sur les relations imbriquées
    };
    
    if( query.sortKey && query.sortDirection){        
        options.order ={ [query.sortKey]: `${query.sortDirection}`}
    }else {
      options.order = baseSort
    }

    // 3. Filtres exacts (AND)
    const baseWhere: any = {};
       
    // 1. Filtre sur acteurId
    if (query.acteurId) {
      baseWhere.acteur = { id: parseInt(query.acteurId, 10) }; 
    }
    if (query.isFacultative) {
      baseWhere.isFac = query.isFacultative === 'true' || query.isFacultative === true; 
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
