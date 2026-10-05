import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Branche } from './branche.entity';

@Entity('sous_branche')
export class SousBranche extends BaseEntity {
  @Column({ unique: true })
  code!: string;

  @Column()
  libelle!: string;

  @ManyToOne(() => Branche, (branche) => branche.sousBranches)
  @JoinColumn({ name: 'branche_id' })
  branche!: Branche;

  @Column({ name: 'branche_id' })
  brancheid!: number;
}
