import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Acteur } from './entities/acteur.entity';
import { Assure } from './entities/assure.entity';
import { Contact } from './entities/contact.entity';
import { ActeurController } from './controllers/acteur.controller';
import { AssureController } from './controllers/assure.controller';
import { ContactController } from './controllers/contact.controller';
import { ActeurService } from './services/acteur.service';
import { AssureService } from './services/assure.service';
import { ContactService } from './services/contact.service';

@Module({
  imports: [TypeOrmModule.forFeature([Acteur, Assure, Contact])],
  controllers: [ActeurController, AssureController, ContactController],
  providers: [ActeurService, AssureService, ContactService],
  exports: [ActeurService, AssureService, ContactService],
})
export class ActeursModule {}
