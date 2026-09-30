import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from 'src/common/crud/crud.controller';
import { CreateContactDto } from '../dto/create-contact.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { Contact } from '../entities/contact.entity';
import { ContactService } from '../services/contact.service';

@ApiTags('Contact')
@Controller('contacts')
export class ContactController extends CrudController<Contact, CreateContactDto, UpdateContactDto> {
  constructor(service: ContactService) {
    super(service);
  }
}
