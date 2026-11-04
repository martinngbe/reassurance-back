import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Acteur } from '../../acteurs/entities/acteur.entity';
import { NoteDebitCredit } from 'src/flux-financier/entities/note-debit-credit.entity';
import { QuittancePlacement } from 'src/quittances/entities/quittance-placement.entity';
import { Quittance } from 'src/quittances/entities/quittance.entity';


/** Échéance de prime à terme (traités non proportionnels). */
@Entity('echeance_pmd')
export class EcheancePmd extends BaseEntity {
  @ManyToOne(() => Quittance , {  onDelete:'CASCADE'})
  @JoinColumn({ name: 'quittance_id' })
  quittance!: Quittance;

  @Column({ name: 'quittance_id' })
  quittanceId!: number;

  @ManyToOne(() => QuittancePlacement, { nullable: true  , onDelete:'CASCADE'})
  @JoinColumn({ name: 'quittance_placement_id' })
  quittancePlacement?: QuittancePlacement;

  @Column({ name: 'quittance_placement_id', nullable: true })
  quittancePlacementId?: number;

  @ManyToOne(() => Acteur)
  @JoinColumn({ name: 'acteur_id' })
  acteur!: Acteur;

  @Column({ name: 'acteur_id' })
  acteurId!: number;

  @Column({ name: 'numero_tranche' })
  numeroTranche: number=0;

  @Column({ name: 'date_echeance', type: 'date' })
  dateEcheance!: Date;

  @Column({ name: 'devise_id' })
  deviseId!: number;

  @Column({ name: 'cours_devise', type: 'decimal', precision: 18, scale: 5 })
  coursDevise: number = 0;


  @Column({ type: 'decimal', precision: 18, scale: 5 })
  prime: number=0;

  @Column({ name: 'is_placement', default: false })
  isPlacement: boolean=false;

  @Column({ name: 'is_annule', default: false })
  isAnnule: boolean=false;

  @Column({ name: 'echeance_pmd_id_annule', nullable: true })
  echeancePmdIdAnnule?: number;

  @OneToMany(() => NoteDebitCredit, (b) => b.echeancePmd)
  notesDebitCredit!: NoteDebitCredit[];
}
