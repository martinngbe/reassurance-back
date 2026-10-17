import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from 'src/common/crud/crud.controller';
import { CreateContactDto } from '../dto/create-contact.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { Contact } from '../entities/contact.entity';
import { ContactService } from '../services/contact.service';
import { FindManyOptions } from 'typeorm';

@ApiTags('Contact')
@Controller('contacts')
export class ContactController extends CrudController<Contact, CreateContactDto, UpdateContactDto> {
  constructor(service: ContactService) {
    super(service);
  }
     // les diffentes options ou filtre pour 
      protected buildOptions(query: any): FindManyOptions<Contact> {
        const options: FindManyOptions<Contact> = {
          where: {},
          order: { nom: 'ASC' , prenoms:'ASC' }, // Tri par défaut
        };
    
        return options;
      }
}
