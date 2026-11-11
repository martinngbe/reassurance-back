import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeriesCounter } from './entities/series-counter.entity';
import { SeriesService } from './series.service';

@Module({
  imports: [TypeOrmModule.forFeature([SeriesCounter])],
  providers: [SeriesService],
  exports: [SeriesService],
})
export class SeriesModule {}