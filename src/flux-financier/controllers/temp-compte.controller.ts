import {
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindManyOptions } from 'typeorm';
import { CrudController } from 'src/common/crud/crud.controller';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateCompteDto } from '../dto/create-compte.dto';
import { UpdateCompteDto } from '../dto/update-compte.dto';
import { TempCompte } from '../entities/temp-compte.entity';
import { TempCompteService } from '../services/temp-compte.service';
import { Compte } from '../entities/compte.entity';

@ApiTags('Métier Flux Financier - Compte')
@Controller('temp-compte')
@UseGuards(RolesGuard)
export class TempCompteController extends CrudController<TempCompte, CreateCompteDto, UpdateCompteDto> {
  constructor(
    private readonly tempCompteService: TempCompteService ,
   //private readonly compteTransferService: CompteTransferService, // ✅ Injection du service de transfer
  ) {super(tempCompteService);}

   protected buildOptions(query: any): FindManyOptions<TempCompte> {
      const baseSort: any = {libelle: 'ASC'};// Tri par défaut
      const options: FindManyOptions<TempCompte> = {
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
       if (query.createdBy) {
        baseWhere.createdBy =  parseInt(query.createdBy, 10) ;
      }
  
   
  
      console.log("options:", options);
      return options;
    }





  /**
   * Transfère un TempCompte (et ses détails) vers un Compte définitif.
   * Le TempCompte original sera supprimé après transfert.
   */
  @Post(':id/transferer')
  @ApiOperation({ summary: 'Valider et transférer un TempCompte vers un Compte définitif' })
  @ApiParam({ name: 'id', description: 'ID du TempCompte à transférer', type: Number })
  @ApiResponse({
    status: 201,
    description: 'Le Compte définitif créé avec ses détails',
    type: Compte,
  })
  @ApiResponse({ status: 404, description: 'TempCompte introuvable' })
  async transfererVersCompte(@Param('id', ParseIntPipe) id: number): Promise<Compte> {
    return await this.tempCompteService.transfererTempCompteVersCompte(id);
  }
}