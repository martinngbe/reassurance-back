import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from '../../common/crud/crud.controller';

import { Role } from '../entities/role.entity';
import { RoleService } from '../services/role.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';

@ApiTags('Role')
@Controller('role')
export class RoleController extends CrudController<Role, CreateRoleDto, UpdateRoleDto> {
  constructor(service: RoleService) {
    super(service);
  }
}
