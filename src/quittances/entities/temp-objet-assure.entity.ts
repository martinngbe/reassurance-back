import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Quittance } from './quittance.entity';
import { TempQuittance } from './temp-quittance.entity';

/** Objet assuré (bien, intérêt) rattaché à une quittance. */
@Entity('temp_objet_assure')
export class TempObjetAssure extends BaseEntity {
  @ManyToOne(() => TempQuittance)
  @JoinColumn({ name: 'temp_quittance_id' })
  tempQuittance!: TempQuittance;

  @Column({ name: 'temp_quittance_id' })
  tempQuittanceId!: number;

  @Column()
  libelle!: string;
}
