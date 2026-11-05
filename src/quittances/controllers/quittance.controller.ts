// quittance.controller.ts
import {
  Controller, Get, Param, ParseIntPipe, Patch, Post, Body,
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
  constructor(private readonly quittanceService: QuittanceService) {
    super(quittanceService);
  }

  private readonly SEARCHABLE_FIELDS: (keyof Quittance)[] = ['numero', 'dateEffet', 'dateEcheance'];

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
      // ==========================================================
      // AJOUT : Filtrage sur isCession de la police associée
      // La liste des quittance dont police.isFac= vrai ou faut
      // ==========================================================
      if (query.isFac !== undefined) {
        if (!baseWhere.police) {
          baseWhere.police = {};
        }
        // Conversion de la valeur (qui arrive en string depuis l'URL) en booléen
        baseWhere.police.isFac = query.isFac === 'true' || query.isFac === true;
      }
      

    // 4. Filtre de recherche globale (LIKE avec OR)
    if (query.search && this.SEARCHABLE_FIELDS.length > 0) {
      const searchTerm = `%${query.search}%`;      
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

  // ✅ Endpoint d'annulation corrigé
  @Patch(':id/annuler')
  @ApiOperation({ summary: 'Annule une quittance (copie miroir + cascade)' })
  annuler(@Param('id', ParseIntPipe) id: number): Promise<Quittance> {
    return this.quittanceService.annuler(id);
  }

  // ✅ Endpoint d'émission (verrou définitif)
  @Patch(':id/emettre')
  @ApiOperation({ summary: 'Émet la quittance (verrouille le calcul)' })
  emettre(@Param('id', ParseIntPipe) id: number): Promise<Quittance> {
    return this.quittanceService.emettre(id);
  }

  // ✅ Simulation pour le front (aperçu)
  @Post('simuler')
  @ApiOperation({ summary: 'Simule le calcul sans persister' })
  simuler(@Body() dto: Partial<Quittance>): Partial<Quittance> {
    return this.quittanceService.simuler(dto);
  }
}