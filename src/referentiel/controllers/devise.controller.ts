import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from '../../common/crud/crud.controller';

import { Devise } from '../entities/devise.entity';
import { DeviseService } from '../services/devise.service';
import { CreateDeviseDto } from '../dto/create-devise.dto';
import { UpdateDeviseDto } from '../dto/update-devise.dto';
import { FindManyOptions, Like } from 'typeorm';

@ApiTags('Devise')
@Controller('devise')
export class DeviseController extends CrudController<Devise, CreateDeviseDto, UpdateDeviseDto> {
  constructor(service: DeviseService) {
    super(service);
  }

  // 2. Définir les champs textuels recherchables (exclut id, created_at, branche_id, etc.)
  private readonly SEARCHABLE_FIELDS: (keyof Devise)[] = ['code', 'libelle']; 
  // Ajoutez d'autres champs texte ici si votre entité en possède (ex: 'description')

  protected buildOptions(query: any): FindManyOptions<Devise> {
    console.log("________________________________");
    console.log("DeviseController.buildOptions");
    console.log("query:", query);
    console.log("________________________________");

    const options: FindManyOptions<Devise> = {
      order: { libelle: 'ASC' }, // Tri par défaut
    };

    // 3. Filtres exacts (AND)
    const baseWhere: any = {};
    // filtre sur un champs spécifique; Tableau de conditions
    //  if (query.brancheId) {
    //   baseWhere.branche = { id: parseInt(query.brancheId, 10) };
    //   // Note: Si votre entité utilise une colonne directe et non une relation, utilisez :
    //   // baseWhere.brancheId = parseInt(query.brancheId, 10);
    // }

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
