import {
  Controller,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindManyOptions } from 'typeorm';
import { CrudController } from 'src/common/crud/crud.controller';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateBordereauDto } from '../dto/create-bordereau.dto';
import { UpdateBordereauDto } from '../dto/update-bordereau.dto';
import { Bordereau } from '../entities/bordereau.entity';
import { BordereauService } from '../services/bordereau.service';

@ApiTags('Métier Flux Financier - Bordereau')
@Controller('bordereau')
@UseGuards(RolesGuard)
export class BordereauController extends CrudController<Bordereau, CreateBordereauDto, UpdateBordereauDto> {
  constructor(private readonly compteDetailService: BordereauService) {super(compteDetailService);}

  protected buildOptions(query: any): FindManyOptions<Bordereau> {
    const options: FindManyOptions<Bordereau> = {
      where: {},
      order: { createdAt: 'DESC' }, // Tri par défaut
    };
    return options;
  }

}