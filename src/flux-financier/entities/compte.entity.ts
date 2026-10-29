import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { QuittanceCession } from '../../quittances/entities/quittance-cession.entity';
import { CompteType } from '../../referentiel/entities/compte-type.entity';
import { Acteur } from '../../acteurs/entities/acteur.entity';
import { Quittance } from 'src/quittances/entities/quittance.entity';
import { NoteDebitCredit } from './note-debit-credit.entity';
import { CompteDetail } from './compte-detail.entity';

/** Compte courant de traité (position d'un acteur sur un traité donné). 
 * Contient le solde CompteDetail. 
 * Le solde peut être en notre faveur ou pas.
 * Génère une NoteDebitCredit
*/

@Entity('compte')
export class Compte extends BaseEntity {
  /// Relaltion Quittance
  @ManyToOne(() => Quittance)
  @JoinColumn({ name: 'quittance_id' })
  quittance?: Quittance;
  @Column({ name: 'quittance_id', nullable: true })
  quittanceId?: number;
  /// Relation QuittanceCession
  @ManyToOne(() => QuittanceCession, { nullable: true })
  @JoinColumn({ name: 'quittance_cession_id' })
  quittanceCession?: QuittanceCession;
  @Column({ name: 'quittance_cession_id', nullable: true })
  quittanceCessionId?: number;

  @OneToMany(() => NoteDebitCredit, (b) => b.compte)
  notesDebitCredit!: NoteDebitCredit[];

  @OneToMany(() => CompteDetail, (b) => b.compte)
  compteDetails!: CompteDetail[];


  @ManyToOne(() => CompteType)
  @JoinColumn({ name: 'compte_type_id' })
  compteType!: CompteType;

  @Column({ name: 'compte_type_id' })
  compteTypeId!: number;

  @ManyToOne(() => Acteur)
  @JoinColumn({ name: 'acteur_id' })
  acteur!: Acteur;

  @Column({ name: 'acteur_id' })
  acteurId!: number;

  /// Finance
  @Column({ name: 'devise_id' })
  deviseId!: number;

  @Column({ name: 'cours_devise', type: 'decimal', precision: 18, scale: 5 , default: 0})
  coursDevise: number=0;

  // provient de CompteDetail.
  @Column({ type: 'decimal', precision: 18, scale: 5, default: 0 })
  solde: number=0;

  
  @Column({ name: 'is_en_notre_faveur', default: false })
  isEnNotreFaveur: boolean=false;
  
  // les statuts
  @Column({ name: 'is_cession', default: false })
  isCession: boolean=false;

  @Column({ name: 'is_proportionnel', default: true })
  isProportionnel: boolean=false;


  // Annulation  
  @Column({ name: 'is_annule', default: false })
  isAnnule: boolean=false;

  @Column({ name: 'compte_id_annule', nullable: true })
  compteIdAnnule?: number;


}
