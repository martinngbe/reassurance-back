import {
  Controller,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindManyOptions } from 'typeorm';
import { CrudController } from 'src/common/crud/crud.controller';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateCompteTraiteDto } from '../dto/create-compte-traite.dto';
import { UpdateCompteTraiteDto } from '../dto/update-compte-traite.dto';
import { CompteTraite } from '../entities/compte-traite.entity';
import { CompteTraiteService } from '../services/compte-traite.service';

@ApiTags('Métier Flux Financier - CompteTraite')
@Controller('compte-traite')
@UseGuards(RolesGuard)
export class CompteTraiteController extends CrudController<CompteTraite, CreateCompteTraiteDto, UpdateCompteTraiteDto> {
  constructor(private readonly compteTraiteService: CompteTraiteService) {super(compteTraiteService);}

  protected buildOptions(query: any): FindManyOptions<CompteTraite> {
    const options: FindManyOptions<CompteTraite> = {
      where: {},
      order: { createdAt: 'DESC' }, // Tri par défaut
    };
    return options;
  }

}