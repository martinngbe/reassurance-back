import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Unique } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Quittance } from '../../quittances/entities/quittance.entity';
import { QuittanceCession } from '../../quittances/entities/quittance-cession.entity';
import { NoteDebitCredit } from './note-debit-credit.entity';

/** Bordereau de primes ou de sinistres (FAC), manuel ou généré. */
@Entity('bordereau')
export class Bordereau extends BaseEntity {
  
  @ManyToOne(() => Quittance, { nullable: true })
  @JoinColumn({ name: 'quittance_id' })
  quittance?: Quittance;

  @Column({ name: 'quittance_id', nullable: true })
  quittanceId?: number;

  @ManyToOne(() => QuittanceCession, { nullable: true })
  @JoinColumn({ name: 'quittance_cession_id' })
  quittanceCession?: QuittanceCession;

  @Column({ name: 'quittance_cession_id', nullable: true })
  quittanceCessionId?: number;

  @OneToMany(() => NoteDebitCredit, (b) => b.bordereau)
  notesDebitCredit!: NoteDebitCredit[];

  @Column({ type: 'decimal', precision: 18, scale: 2 })
  montant: number=0;

  @Column({ name: 'is_cession', default: false })
  isCession: boolean=false;

  @Column({ name: 'is_proportionnel', default: true })
  isProportionnel: boolean=false;

  @Column({ name: 'is_manuel', default: false })
  isManuel: boolean=false;

  @Column({ name: 'is_annule', default: false })
  isAnnule: boolean=false;

  @Column({ name: 'bordereau_id_annule', nullable: true })
  bordereauIdAnnule!: number;

 

  
}
