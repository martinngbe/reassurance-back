import { 
  Entity, 
  PrimaryColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn, 
  Index 
} from 'typeorm';

@Entity('series_counters')
export class SeriesCounter {
  @PrimaryColumn({ type: 'varchar', length: 100 })
  seriesKey!: string;

  @Column({ type: 'varchar', length: 20 })
  prefix!: string;

  @Column({ type: 'int', default: 5 })
  paddingLength!: number;

  @Column({ type: 'bigint', default: 0 })
  currentValue!: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Index()
  description!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;
}