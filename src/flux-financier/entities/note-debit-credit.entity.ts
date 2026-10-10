import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Quittance } from '../../quittances/entities/quittance.entity';
import { QuittanceCession } from '../../quittances/entities/quittance-cession.entity';
import { Bordereau } from './bordereau.entity';
import { CompteTraite } from './compte-traite.entity';
import { ReglementDetail } from './reglement-detail.entity';
import { SinistreReglementQuittance } from 'src/sinistres/entities/sinistre-reglement-quittance.entity';
import { SinistreReglementQuittanceCession } from 'src/sinistres/entities/sinistre-reglement-quittance-cession.entity';
import { EcheancePmd } from './echeance-pmd.entity';

/**
 * Note de débit / crédit : pièce comptable générée à partir d'une
 * quittance, d'un bordereau, d'une échéance PMD, d'un compte traité ou
 * d'un sinistre (sinistreId / sinistreRelementQuittance référencent le module
 * sinistres, sans contrainte FK stricte pour rester découplé).
 */
@Entity('note_debit_credit')
export class NoteDebitCredit extends BaseEntity {
 
  // Relation Quittance
  @ManyToOne(() => Quittance)
  @JoinColumn({ name: 'quittance_id' })
  quittance?: Quittance;
  @Column({ name: 'quittance_id' })
  quittanceId?: number;
  // Relation QuittanceCession
  @ManyToOne(() => QuittanceCession, { nullable: true })
  @JoinColumn({ name: 'quittance_cession_id' })
  quittanceCession?: QuittanceCession;
  @Column({ name: 'quittance_cession_id', nullable: true })
  quittanceCessionId?: number;
  //////////////////////////////
  //  Relation Bordereau
  @ManyToOne(() => Bordereau, { nullable: true })
  @JoinColumn({ name: 'bordereau_id' })
  bordereau?: Bordereau;
  @Column({ name: 'bordereau_id', nullable: true })
  bordereauId?: number;
  //////////////////////////////
  // Relation PMD
  @ManyToOne(() => EcheancePmd, { nullable: true })
  @JoinColumn({ name: 'echeance_pmd_id' })
  echeancePmd?: EcheancePmd;
  @Column({ name: 'echeance_pmd_id', nullable: true })
  echeancePmdId?: number;
  //////////////////////////////
  // Relation CompteTraite
  @ManyToOne(() => CompteTraite, { nullable: true })
  @JoinColumn({ name: 'compte_traite_id' })
  compteTraite?: CompteTraite;
  @Column({ name: 'compte_traite_id', nullable: true })
  compteTraiteId?: number;

  //////////////  SINISTRE /////////////////////////////////
  // Relation SinistreReglementQuittance
  @ManyToOne(() => SinistreReglementQuittance, { nullable: true })
  @JoinColumn({ name: 'sinistre_reglement_quittance_id' })
  sinistreReglementQuittance?: SinistreReglementQuittance;
  @Column({ name: 'sinistre_reglement_quittance_id', nullable: true })
  sinistreReglementQuittanceId?: number;
  // Relation SinistreReglementQuittanceCession
  @ManyToOne(() => SinistreReglementQuittanceCession, { nullable: true })
  @JoinColumn({ name: 'sinistre_reglement_quittance_cession_id' })
  sinistreReglementQuittanceCession?: SinistreReglementQuittanceCession;
  @Column({ name: 'sinistre_reglement_quittance_cession_id', nullable: true })
  sinistreReglementQuittanceCessionId?: number;



  /**
   * ✅ Relation inverse : une NDC peut être référencée par plusieurs ReglementDetail
   */
  @OneToMany(() => ReglementDetail, (rd) => rd.noteDebitCredit)
  reglementDetails!: ReglementDetail[]; 


  @Column({ name: 'sinistre_id', nullable: true })
  sinistreId?: number;

  @Column({ name: 'sinistre_evaluation_id', nullable: true })
  sinistreEvaluationId?: number;

  @Column({ name: 'is_cession', default: false })
  isCession: boolean=false;

  @Column({ name: 'is_proportionnel', default: true })
  isProportionnel: boolean=false;

  @Column({ name: 'is_fac', default: false })
  isFac: boolean=false;

  @Column({ name: 'is_sinistre', default: false })
  isSinistre: boolean=false;

  // true = débit, false = crédit
  @Column({ name: 'is_debit', default: true })
  isDebit: boolean=false;

  @Column({ type: 'decimal', precision: 18, scale: 2 })
  montant: number=0;

  // Annulation
  @Column({ name: 'is_annule', default: false })
  isAnnule: boolean=false;
  @Column({ name: 'note_debit_credit_id_annule', nullable: true })
  noteDebitCreditIdAnnule?: number;
}
