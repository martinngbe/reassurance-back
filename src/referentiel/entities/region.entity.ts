import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Pays } from './pays.entity';

@Entity('region')
export class Region extends BaseEntity {
  @Column({ unique: true })
  code!: string;

  @Column()
  libelle!: string;

  @OneToMany(() => Pays, (pays) => pays.region)
  pays!: Pays[];
}
