import {
  Controller,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindManyOptions } from 'typeorm';
import { CrudController } from 'src/common/crud/crud.controller';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CompteTraiteDetail } from '../entities/compte-traite-detail.entity';
import { CompteTraiteDetailService } from '../services/compte-traite-detail.service';
import { CreateCompteTraiteDetailDto } from '../dto/create-compte-traite-detail.dto';
import { UpdateCompteTraiteDetailDto } from '../dto/update-compte-traite-detail.dto';

@ApiTags('Métier Flux Financier - CompteTraiteDetail')
@Controller('compte-traite-detail')
@UseGuards(RolesGuard)
export class CompteTraiteDetailController extends CrudController<CompteTraiteDetail, CreateCompteTraiteDetailDto, UpdateCompteTraiteDetailDto> {
  constructor(private readonly compteTraiteDetailService: CompteTraiteDetailService) {super(compteTraiteDetailService);}

  protected buildOptions(query: any): FindManyOptions<CompteTraiteDetail> {
    const options: FindManyOptions<CompteTraiteDetail> = {
      where: {},
      order: { createdAt: 'DESC' }, // Tri par défaut
    };
    return options;
  }

}