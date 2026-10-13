import {
  Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe,
  HttpCode, HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ReglementService } from '../services/reglement.service';
import { Reglement } from '../entities/reglement.entity';
import { FindManyOptions } from 'typeorm';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CrudController } from 'src/common/crud/crud.controller';
import { IResponse } from 'src/common/interfaces/response.interface';
import { CreateReglementDto } from '../dto/create-reglement.dto';
import { UpdateReglementDto } from '../dto/update-reglement.dto';
import { OPERATION_SUCCES, success } from 'src/common/helper/response.helper';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('Métier Flux Financier - Règlements')
@Controller('reglement')
@UseGuards(RolesGuard)
export class ReglementController extends CrudController<Reglement, CreateReglementDto, UpdateReglementDto> {
  constructor(private readonly reglementService: ReglementService) {super(reglementService);}

  protected buildOptions(query: any): FindManyOptions<Reglement> {
    const options: FindManyOptions<Reglement> = {
      where: {},
      order: { createdAt: 'DESC' }, // Tri par défaut
    };
    return options;
  }

  @Post()
  @Roles('COMPTABILITE')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crée un nouveau règlement' })
 async  create(@Body() reglement: Partial<Reglement>): Promise<IResponse> {
    const resultat = await this.reglementService.create(reglement);
    return success(resultat)
  }

  @Put(':id')
  @Roles('COMPTABILITE')
  @ApiOperation({ summary: 'Met à jour un règlement' })
 async update(@Param('id', ParseIntPipe) id: number, @Body() reglement: Partial<Reglement>): Promise<IResponse> {
    const resultat = await this.reglementService.update(id, reglement);
    return success(resultat)
  }

  @Delete(':id')
  @Roles('COMPTABILITE')
  @HttpCode(HttpStatus.OK) // ✅ 200 au lieu de 204 (car on renvoie un body)
  @ApiOperation({ summary: 'Supprime un règlement' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<IResponse> {
    await this.reglementService.remove(id);
    return {success: true , message: OPERATION_SUCCES}
  }
}