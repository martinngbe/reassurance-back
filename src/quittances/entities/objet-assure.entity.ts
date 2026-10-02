import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Quittance } from './quittance.entity';

/** Objet assuré (bien, intérêt) rattaché à une quittance. */
@Entity('objet_assure')
export class ObjetAssure extends BaseEntity {
  @ManyToOne(() => Quittance)
  @JoinColumn({ name: 'quittance_id' })
  quittance!: Quittance;

  @Column({ name: 'quittance_id' })
  quittanceId!: number;

  @Column()
  libelle!: string;
}
