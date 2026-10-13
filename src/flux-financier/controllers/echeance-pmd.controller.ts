import {
  Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe,
  HttpCode, HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindManyOptions } from 'typeorm';
import { CrudController } from 'src/common/crud/crud.controller';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateEcheancePmdDto } from 'src/quittances/dto/create-echeance-pmd.dto';
import { UpdateEcheancePmdDto } from 'src/quittances/dto/update-echeance-pmd.dto';
import { EcheancePmd } from '../entities/echeance-pmd.entity';
import { EcheancePmdService } from '../services/echeance-pmd.service';

@ApiTags('Métier Flux Financier - EcheancePmd')
@Controller('echeance-pmd')
@UseGuards(RolesGuard)
export class EcheancePmdController extends CrudController<EcheancePmd, CreateEcheancePmdDto, UpdateEcheancePmdDto> {
  constructor(private readonly echeancePmdService: EcheancePmdService) {super(echeancePmdService);}

  protected buildOptions(query: any): FindManyOptions<EcheancePmd> {
    const options: FindManyOptions<EcheancePmd> = {
      where: {},
      order: { createdAt: 'DESC' }, // Tri par défaut
    };
    return options;
  }

}