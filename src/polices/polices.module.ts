import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Police } from './entities/police.entity';
import { PoliceService } from './services/police.service';
import { PoliceController } from './controllers/police.controller';
import { ClsModule } from 'nestjs-cls';
import { TempPoliceController } from './controllers/temp-police.controller';
import { TempPoliceService } from './services/temp-police.service';
import { TempPolice } from './entities/temp-police.entity';

@Module({
  
  imports: [
     ClsModule, // ⬅️ OBLIGATOIRE pour @Transactional pour que le CLS fonctionne dans ce module
    TypeOrmModule.forFeature([Police , TempPolice])],
  controllers: [PoliceController , TempPoliceController],
  providers: [PoliceService , TempPoliceService],
  exports: [PoliceService,TempPoliceService],
})
export class PolicesModule {}
