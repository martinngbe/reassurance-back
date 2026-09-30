import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Branche } from './branche.entity';

@Entity('sous_branches')
export class SousBranche extends BaseEntity {
  @Column({ unique: true })
  code!: string;

  @Column()
  libelle!: string;

  @ManyToOne(() => Branche, (branche) => branche.sousBranches)
  @JoinColumn({ name: 'id_branche' })
  branche!: Branche;

  @Column({ name: 'id_branche' })
  idBranche!: number;
}
