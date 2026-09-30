import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Quittance } from './quittance.entity';
import { QuittanceCession } from './quittance-cession.entity';
import { Acteur } from '../../acteurs/entities/acteur.entity';
import { NoteDebitCredit } from 'src/flux-financier/entities/note-debit-credit.entity';

/** Échéance de prime à terme (traités non proportionnels). */
@Entity('echeances_pmd')
export class EcheancePmd extends BaseEntity {
  @ManyToOne(() => Quittance)
  @JoinColumn({ name: 'quittance_id' })
  quittance!: Quittance;

  @Column({ name: 'quittance_id' })
  quittanceId!: number;

  @ManyToOne(() => QuittanceCession, { nullable: true })
  @JoinColumn({ name: 'quittance_cession_id' })
  quittanceCession?: QuittanceCession;

  @Column({ name: 'quittance_cession_id', nullable: true })
  quittanceCessionId?: number;

  @ManyToOne(() => Acteur)
  @JoinColumn({ name: 'acteur_id' })
  acteur!: Acteur;

  @Column({ name: 'acteur_id' })
  acteurId!: number;

  @Column({ name: 'numero_tranche' })
  numeroTranche: number=0;

  @Column({ name: 'date_echeance', type: 'date' })
  dateEcheance!: Date;

  @Column({ type: 'decimal', precision: 18, scale: 2 })
  prime: number=0;

  @Column({ name: 'is_cession', default: false })
  isCession: boolean=false;

  @Column({ name: 'is_annule', default: false })
  isAnnule: boolean=false;

  @Column({ name: 'id_echeance_pmd_annule', nullable: true })
  echeancePmdIdAnnule?: number;

  @OneToMany(() => NoteDebitCredit, (b) => b.echeancePmd)
  notesDebitCredit!: NoteDebitCredit[];
}
