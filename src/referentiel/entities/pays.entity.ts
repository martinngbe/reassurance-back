import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Region } from './region.entity';

@Entity('pays')
export class Pays extends BaseEntity {
  @Column()
  indicatif!: string;

  @Column({ unique: true })
  code!: string;

  @Column()
  libelle!: string;

  @ManyToOne(() => Region, (region) => region.pays , {eager:true})
  @JoinColumn({ name: 'region_id' })
  region!: Region;
  @Column({ name: 'region_id' })
  regionId!: number;
}
