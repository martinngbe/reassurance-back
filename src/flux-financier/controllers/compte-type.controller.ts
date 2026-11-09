import {
  Controller,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindManyOptions } from 'typeorm';
import { CrudController } from 'src/common/crud/crud.controller';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CompteType } from '../entities/compte-type.entity';
import { CreateCompteTypeDto } from '../dto/create-compte-type.dto';
import { UpdateCompteTypeDto } from '../dto/update-compte-type.dto';
import { CompteTypeService } from '../services/compte-type.service';

@ApiTags('Métier Flux Financier - Compte')
@Controller('compte-type')
@UseGuards(RolesGuard)
export class CompteTypeController extends CrudController<CompteType, CreateCompteTypeDto, UpdateCompteTypeDto> {
  constructor(private readonly compteTypeService: CompteTypeService) {super(compteTypeService);}

  protected buildOptions(query: any): FindManyOptions<CompteType> {
    const options: FindManyOptions<CompteType> = {
      where: {},
      order: { createdAt: 'DESC' }, // Tri par défaut
    };
    return options;
  }

}