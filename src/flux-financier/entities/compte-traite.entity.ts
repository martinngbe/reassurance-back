import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { QuittanceCession } from '../../quittances/entities/quittance-cession.entity';
import { CompteType } from '../../referentiel/entities/compte-type.entity';
import { Acteur } from '../../acteurs/entities/acteur.entity';
import { Quittance } from 'src/quittances/entities/quittance.entity';
import { NoteDebitCredit } from './note-debit-credit.entity';
import { CompteTraiteDetail } from './compte-traite-detail.entity';

/** Compte courant de traité (position d'un acteur sur un traité donné). */
@Entity('compte_traite')
export class CompteTraite extends BaseEntity {

  @ManyToOne(() => Quittance, { nullable: true })
  @JoinColumn({ name: 'quittance_id' })
  quittance?: Quittance;

  @Column({ name: 'quittance_id', nullable: true })
  quittanceId?: number;

  @ManyToOne(() => QuittanceCession, { nullable: true })
  @JoinColumn({ name: 'quittance_retro_cession_id' })
  quittanceRetroCession?: QuittanceCession;

  @Column({ name: 'quittance_retro_cession_id', nullable: true })
  quittanceRetroCessionId?: number;

  @OneToMany(() => NoteDebitCredit, (b) => b.compteTraite)
  notesDebitCredit: NoteDebitCredit[]=[];

  @OneToMany(() => CompteTraiteDetail, (b) => b.compteTraite)
  compteTraiteDetails: CompteTraiteDetail[]=[];


  @ManyToOne(() => CompteType)
  @JoinColumn({ name: 'id_compte_type' })
  compteType!: CompteType;

  @Column({ name: 'compte_type_id' })
  compteTypeId!: number;



  @ManyToOne(() => Acteur)
  @JoinColumn({ name: 'acteur_id' })
  acteur!: Acteur;

  @Column({ name: 'acteur_id' })
  acteurId!: number;

  @Column({ name: 'devise_id' })
  deviseId!: number;

  @Column({ name: 'cours_devise', type: 'decimal', precision: 18, scale: 6 })
  coursDevise: number=0;

  @Column({ name: 'is_cession', default: false })
  isCession: boolean=false;

  @Column({ name: 'is_proportionnel', default: true })
  isProportionnel: boolean=false;

  @Column({ name: 'is_en_notre_faveur', default: false })
  isEnNotreFaveur: boolean=false;

  @Column({ name: 'is_annule', default: false })
  isAnnule: boolean=false;

  @Column({ name: 'compte_traite_id_annule', nullable: true })
  compteTratieIdAnnule?: number;

  @Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
  solde: number=0;
}
