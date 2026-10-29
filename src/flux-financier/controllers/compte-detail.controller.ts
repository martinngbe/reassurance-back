import {
  Controller,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindManyOptions } from 'typeorm';
import { CrudController } from 'src/common/crud/crud.controller';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CompteDetail } from '../entities/compte-detail.entity';
import { CompteDetailService } from '../services/compte-detail.service';
import { CreateCompteDetailDto } from '../dto/create-compte-detail.dto';
import { UpdateCompteDetailDto } from '../dto/update-compte-detail.dto';

@ApiTags('Métier Flux Financier - CompteDetail')
@Controller('compte-detail')
@UseGuards(RolesGuard)
export class CompteDetailController extends CrudController<CompteDetail, CreateCompteDetailDto, UpdateCompteDetailDto> {
  constructor(private readonly compteDetailService: CompteDetailService) {super(compteDetailService);}

  protected buildOptions(query: any): FindManyOptions<CompteDetail> {
    const options: FindManyOptions<CompteDetail> = {
      where: {},
      order: { createdAt: 'DESC' }, // Tri par défaut
    };
    return options;
  }

}