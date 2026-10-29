import {
  Controller,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindManyOptions } from 'typeorm';
import { CrudController } from 'src/common/crud/crud.controller';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateCompteDto } from '../dto/create-compte.dto';
import { UpdateCompteDto } from '../dto/update-compte.dto';
import { Compte } from '../entities/compte.entity';
import { CompteService } from '../services/compte.service';

@ApiTags('Métier Flux Financier - Compte')
@Controller('compte')
@UseGuards(RolesGuard)
export class CompteController extends CrudController<Compte, CreateCompteDto, UpdateCompteDto> {
  constructor(private readonly compteService: CompteService) {super(compteService);}

  protected buildOptions(query: any): FindManyOptions<Compte> {
    const options: FindManyOptions<Compte> = {
      where: {},
      order: { createdAt: 'DESC' }, // Tri par défaut
    };
    return options;
  }

}