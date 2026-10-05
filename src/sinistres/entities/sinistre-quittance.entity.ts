import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Sinistre } from './sinistre.entity';
import { Quittance } from '../../quittances/entities/quittance.entity';

/** Rattachement d'un sinistre aux quittances (acceptation) concernées. */
@Entity('sinistre_quittance')
@Unique(["sinistreId", "quittanceId"]) // évite les doublons
export class SinistreQuittance extends BaseEntity {
  @ManyToOne(() => Sinistre)
  @JoinColumn({ name: 'sinistre_id' })
  sinistre!: Sinistre;
  @Column({ name: 'sinistre_id' })
  sinistreId!: number;

  @ManyToOne(() => Quittance)
  @JoinColumn({ name: 'quittance_id' })
  quittance!: Quittance;
  @Column({ name: 'quittance_id' })
  quittanceId!: number;
}
