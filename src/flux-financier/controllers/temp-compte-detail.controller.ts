import { Controller, UseGuards, Get, Query, Body, Param, Post, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { FindManyOptions } from 'typeorm';
import { CrudController } from 'src/common/crud/crud.controller';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { TempCompteDetail } from '../entities/temp-compte-detail.entity';
import { CreateCompteDetailDto } from '../dto/create-compte-detail.dto';
import { UpdateCompteDetailDto } from '../dto/update-compte-detail.dto';
import { TempCompteDetailService } from '../services/temp-compte-detail.service';
import { success, successPaginated } from 'src/common/helper/response.helper';
import { LogMethod } from 'src/common/decorateur/log-method.decorator';
import { CreateTempCompteDetailDto } from '../dto/create-temp-compte-detail.dto';
import { UpdateTempCompteDetailDto } from '../dto/update-temp-compte-detail.dto';

@ApiTags('Métier Flux Financier - CompteDetail')
@Controller('temp-compte-detail')
@UseGuards(RolesGuard)
export class TempCompteDetailController extends CrudController<
  TempCompteDetail,
  CreateTempCompteDetailDto,
  UpdateTempCompteDetailDto
> {
  constructor(private readonly tempCompteDetailService: TempCompteDetailService) {
    super(tempCompteDetailService);
  }

  protected buildOptions(query: any): FindManyOptions<TempCompteDetail> {
    return { where: {}, order: { createdAt: 'DESC' } };
  }

  /**
   * Override de la méthode create pour appliquer la logique métier
   * POST /temp-compte-detail
   */
  @Post()
  @ApiOperation({ summary: 'Créer un détail avec recalcul automatique du solde' })
  @LogMethod()
  async create(@Body() dto: CreateTempCompteDetailDto) {
    const result = await this.tempCompteDetailService.saveDetailAndUpdateSolde(dto);
    return success(result, 'Détail créé et solde mis à jour avec succès');
  }

  /**
   * Override de la méthode update pour appliquer la logique métier
   * PUT /temp-compte-detail/:id
   */
  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un détail avec recalcul automatique du solde' })
  @LogMethod()
  async update(@Param('id') id: number, @Body() dto: UpdateTempCompteDetailDto) {
    const result = await this.tempCompteDetailService.saveDetailAndUpdateSolde({
      id,
      ...dto,
    });
    return success(result, 'Détail mis à jour et solde recalculé avec succès');
  }

  /**
   * ⬅️ NOUVEAU : Annulation logique (soft delete) avec recalcul du solde
   * DELETE /temp-compte-detail/:id
   */
  @Delete(':id')
  @ApiOperation({
    summary: 'Annuler un détail (soft delete) et recalculer le solde',
    description: 'La ligne n\'est pas supprimée physiquement mais marquée comme annulée (isAnnule=true). Le solde du compte parent est recalculé.',
  })
  @LogMethod()
  async delete(@Param('id') id: number) {
    const result = await this.tempCompteDetailService.annulerDetail(id);
    return success(result, 'Détail annulé et solde recalculé avec succès');
  }



  @Get('rubriques-with-soldes')
  @ApiOperation({ summary: 'Toutes les rubriques avec totaux (paginé)' })
  @ApiQuery({ name: 'compteId', required: false, type: Number })
  @ApiQuery({
    name: 'isProportionnelle',
    required: false,
    type: Boolean,
    description: 'Filtrer par type de rubrique (true = proportionnelle, false = non proportionnelle)',
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 50 })
  @LogMethod()
  async getRubriquesWithSoldes(
    @Query('compteId') compteId?: number,
    @Query('isProportionnelle') isProportionnelle?: string | null,
    @Query('isNonProportionnelle') isNonProportionnelle?: string | null,
    @Query('page') page = 1,
    @Query('limit') limit = 50,
  ) {
      // Conversion sécurisée du booléen (les query params arrivent en string)
      // let isProp: boolean | undefined;
      // if (isProportionnelle !== undefined) {
      //   isProp = isProportionnelle === 'true';
      // }
      console.log(' ______________ tempCompteDetailController.getRubriquesWithSoldes ______________')
      console.log('isProportionnelle:',isProportionnelle)      
      console.log('isNonProportionnelle:',isNonProportionnelle)
      console.log('compteId:',compteId)
      const result= await this.tempCompteDetailService
      .getRubriquesWithSoldes(
              compteId,
              isProportionnelle,
              isNonProportionnelle,
              +page,
              +limit,
            );
    return successPaginated(result )
  }
}