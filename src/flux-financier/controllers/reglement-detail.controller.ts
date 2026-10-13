import {
  Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe,
  HttpCode, HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FindManyOptions } from 'typeorm';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CrudController } from 'src/common/crud/crud.controller';
import { IResponse } from 'src/common/interfaces/response.interface';
import { OPERATION_SUCCES, success } from 'src/common/helper/response.helper';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ReglementDetail } from '../entities/reglement-detail.entity';
import { ReglementDetailService } from '../services/reglement-detail.service';
import { CreateReglementDetailDto } from '../dto/create-reglement-detail.dto';
import { UpdateReglementDetailDto } from '../dto/update-reglement-detail.dto';

@ApiTags('Métier Flux Financier - Règlements')
@Controller('reglement-detail')
@UseGuards(RolesGuard)
export class ReglementDetailController extends CrudController<ReglementDetail, CreateReglementDetailDto, UpdateReglementDetailDto> {
  constructor(private readonly reglementDetailService: ReglementDetailService) {super(reglementDetailService);}

  protected buildOptions(query: any): FindManyOptions<ReglementDetail> {
    const options: FindManyOptions<ReglementDetail> = {
      where: {},
      order: { createdAt: 'DESC' }, // Tri par défaut
    };
    return options;
  }

  @Post()
  @Roles('COMPTABILITE')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crée un nouveau règlement' })
 async  create(@Body() reglementDetail: Partial<ReglementDetail>): Promise<IResponse> {
    const resultat = await this.reglementDetailService.create(reglementDetail);
    return success(resultat)
  }

  @Put(':id')
  @Roles('COMPTABILITE')
  @ApiOperation({ summary: 'Met à jour un règlement' })
 async update(@Param('id', ParseIntPipe) id: number, @Body() reglementDetail: Partial<ReglementDetail>): Promise<IResponse> {
    const resultat = await this.reglementDetailService.update(id, reglementDetail);
    return success(resultat)
  }

  @Delete(':id')
  @Roles('COMPTABILITE')
  @HttpCode(HttpStatus.OK) // ✅ 200 au lieu de 204 (car on renvoie un body)
  @ApiOperation({ summary: 'Supprime un règlement' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<IResponse> {
    await this.reglementDetailService.remove(id);
    return {success: true , message: OPERATION_SUCCES}
  }
}