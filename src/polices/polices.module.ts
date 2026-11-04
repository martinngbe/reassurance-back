import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Police } from './entities/police.entity';
import { PoliceService } from './services/police.service';
import { PoliceController } from './controllers/police.controller';
import { ClsModule } from 'nestjs-cls';
import { TempPoliceController } from './controllers/temp-police.controller';
import { TempPoliceService } from './services/temp-police.service';
import { TempPolice } from './entities/temp-police.entity';
import { QuittanceCalculService } from 'src/quittances/services/quittance-calcul.service';

@Module({
  
  imports: [
     ClsModule, // ⬅️ OBLIGATOIRE pour @Transactional pour que le CLS fonctionne dans ce module
    TypeOrmModule.forFeature([Police , TempPolice])],
  controllers: [PoliceController , TempPoliceController],
  providers: [PoliceService , TempPoliceService , QuittanceCalculService],
  exports: [PoliceService,TempPoliceService ,QuittanceCalculService],
})
export class PolicesModule {}
