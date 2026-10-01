import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Police } from './entities/police.entity';
import { PoliceService } from './services/police.service';
import { PoliceController } from './controllers/police.controller';
import { ClsModule } from 'nestjs-cls';

@Module({
  
  imports: [
     ClsModule, // ⬅️ OBLIGATOIRE pour @Transactional pour que le CLS fonctionne dans ce module
    TypeOrmModule.forFeature([Police])],
  controllers: [PoliceController],
  providers: [PoliceService],
  exports: [PoliceService],
})
export class PolicesModule {}
