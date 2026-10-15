import {
  Body,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CrudService} from './crud.service';
import { FindManyOptions } from 'typeorm';
import {  IResponse,  PaginationParams } from '../interfaces/response.interface';
import { successPaginated, successList, success } from '../helper/response.helper';


/**
 * Contrôleur CRUD générique avec pagination automatique.
 */
export abstract class CrudController<
  T extends { id: number },
  CreateDto,
  UpdateDto,
> {
  protected constructor(protected readonly service: CrudService<T>) {}

  /**
   * Méthode protégée pour construire les options TypeORM.
   * À surcharger dans les contrôleurs enfants pour ajouter des filtres dynamiques.
   */
  protected buildOptions(query: any): FindManyOptions<T> {
    return {}; // Par défaut, pas de filtres
  }

  /**
   * GET / - Liste paginée (par défaut)
   */
  @Get()
  async findAll(  
    @Query() query: any, // <-- Récupère tous les paramètres d'URL (?brancheId=X)
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<IResponse<T[]>> {
    const pagination: PaginationParams = {
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 10,
    };

    // <-- Appel de votre méthode de filtre
    const options = this.buildOptions(query); 
    
    // <-- Passage des options au service
    const result = await this.service.findAllPaginated(pagination, options);
    return successPaginated(result);     
    // const result = await this.service.findAllPaginated(pagination);
    // return successPaginated(result);
  }

  /**
   * GET /all - Liste complète (sans pagination, pour dropdowns)
   */
  @Get('all')
  async findAllWithoutPagination(): Promise<IResponse<T[]>> {
    const data = await this.service.findAll();
    return successList(data);
  }

  /**
   * GET /:id - Détail d'une entité
   */
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<IResponse<T>> {
    const entity = await this.service.findOne(id);
    return success(entity);
  }

  /**
   * POST / - Création
   */
  @Post()
  async create(@Body() dto: CreateDto): Promise<IResponse<T>> {
    const entity = await this.service.create(dto as any);
    return success(entity, 'Création effectuée avec succès');
  }

  /**
   * PUT /:id - Modification
   */
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDto,
  ): Promise<IResponse<T>> {
    const entity = await this.service.update(id, dto as any);
    return success(entity, 'Modification effectuée avec succès');
  }

    /**
   * Patch / - Création
   */
  @Patch(':id')
   async patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDto,
  ): Promise<IResponse<T>> {   
    return this.update(id,dto);
  }
  /**
   * DELETE /:id - Suppression
   */
  @Delete(':id')
  @HttpCode(200)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<IResponse<null>> {
    await this.service.remove(id);
    return { success: true, message: 'Suppression effectuée avec succès' };
  }
}