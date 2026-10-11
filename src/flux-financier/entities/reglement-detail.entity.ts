import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Reglement } from './reglement.entity';
import { NoteDebitCredit } from './note-debit-credit.entity';

/** Ventilation d'un règlement sur une ou plusieurs notes de débit/crédit. */
/**  
 *  Le choix de la liste des NoteDebitCrédit à regler.
 *  La liste des NoteDebitCredit de l'Acteur concerné sera affichée
 *  Le Reglement peut être partiel. 
 *  Par défaut le montant sera le solde de la NoteDebitCredit.
 *  Il faudra alors suivre le solde NoteDebitCredit.
 *  La devise doit être identique pour toutes Les NoteDebitCrédit sélectionnées
 */
@Entity('reglement_detail')
export class ReglementDetail extends BaseEntity {
  @ManyToOne(() => Reglement)
  @JoinColumn({ name: 'reglement_id' })
  reglement!: Reglement;

  @Column({ name: 'reglement_id' })
  reglementId!: number;

  @ManyToOne(() => NoteDebitCredit)
  @JoinColumn({ name: 'note_debit_credit_id' })
  noteDebitCredit!: NoteDebitCredit;

  @Column({ name: 'note_debit_credit_id' })
  noteDebitCreditId!: number;

  @Column({ name: 'devise_id' })
  deviseId!: number;

  @Column({ name: 'cours_devise', type: 'decimal', precision: 18, scale: 5 })
  coursDevise: number = 0;

  @Column({ type: 'decimal', precision: 18, scale: 5 })
  montant: number=0;


  @Column({ name: 'is_annule', default: false })
  isAnnule: boolean=false;

   @Column({ name: 'reglement_detail_id_annule', nullable: true })
  reglementDetailIdAnnule?: number;

}
