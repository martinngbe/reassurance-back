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

  @ManyToOne(() => Region, (region) => region.pays)
  @JoinColumn({ name: 'id_region' })
  region!: Region;

  @Column({ name: 'id_region' })
  idRegion!: number;
}
