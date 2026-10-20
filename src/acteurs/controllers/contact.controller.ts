import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from 'src/common/crud/crud.controller';
import { CreateContactDto } from '../dto/create-contact.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { Contact } from '../entities/contact.entity';
import { ContactService } from '../services/contact.service';
import { FindManyOptions } from 'typeorm';

@ApiTags('Contact')
@Controller('contact')
export class ContactController extends CrudController<Contact, CreateContactDto, UpdateContactDto> {
  constructor(service: ContactService) {
    super(service);
  }
     // les diffentes options ou filtre pour 
      protected buildOptions(query: any): FindManyOptions<Contact> {        
            console.log("_____________________________________")
            console.log("ContactController.buildOptions")
            console.log("query:",query)
            console.log("_____________________________________")
            
            const options: FindManyOptions<Contact> = {
              where: {},
              order: {}, 
            };
            const baseSort: any = { nom: 'ASC' , prenoms:'ASC' };// Tri par défaut
            if( query.sortKey && query.sortDirection){
                options.order ={ [query.sortKey]: `${query.sortDirection}`}
            }else {
              options.order = baseSort
            }   

            // filtre sur un champs spécifique; Tableau de conditions
            const baseWhere: any = {};
            if (query.acteurId) {
              baseWhere.acteur = { id: parseInt(query.acteurId, 10) }; 
            }
            
            options.where = baseWhere

            console.log("options:",options)
            console.log("_____________________________________")
            return options;
      }
}
