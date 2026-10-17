// import { Controller } from '@nestjs/common';
// import { ApiTags } from '@nestjs/swagger';
// import { CrudController } from '../../common/crud/crud.controller';
// import { SousBranche } from '../entities/sous-branche.entity';
// import { SousBrancheService } from '../services/sous-branche.service';
// import { CreateSousBrancheDto } from '../dto/create-sous-branche.dto';
// import { UpdateSousBrancheDto } from '../dto/update-sous-branche.dto';
// import { FindManyOptions } from 'typeorm';

// @ApiTags('SousBranche')
// @Controller('sous-branche')
// export class SousBrancheController extends CrudController<SousBranche, CreateSousBrancheDto, UpdateSousBrancheDto> {
//   constructor(service: SousBrancheService) {
//     super(service);
//   }

//      // les diffentes options ou filtre pour 
//       protected buildOptions(query: any): FindManyOptions<SousBranche> {
//         console.log("________________________________");
//         console.log("SousBrancheController.buildOptions");
//         console.log("query:", query);
//         console.log("________________________________");

//         // 1. Initialisation de base
//         const options: FindManyOptions<SousBranche> = {
//           order: { code: 'ASC' }, // Tri par défaut
//         };
//         // 2. Construction dynamique du where (évite les erreurs de typage TS strict)
//         const whereCondition: any = {};
//         if (query.brancheId) {
//           // Ajout du radix 10 pour parseInt (bonne pratique)
//           whereCondition.branche = { id: parseInt(query.brancheId, 10) };
//         }
//         // 3. Assignation finale
//         options.where = whereCondition;        
//         console.log("options:", options);
//         return options;
//       }
// }
