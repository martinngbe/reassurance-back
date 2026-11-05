import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { NoteDebitCredit } from 'src/flux-financier/entities/note-debit-credit.entity';
import { QuittancePlacement } from 'src/quittances/entities/quittance-placement.entity';
import { Quittance } from 'src/quittances/entities/quittance.entity';
import Decimal from 'decimal.js';
import { DecimalTransformer } from 'src/common/transformers/decimal.transformer';
import { Devise } from 'src/referentiel/entities/devise.entity';


/** Échéance de prime à terme (traités non proportionnels). */
@Entity('echeance_pmd')
export class EcheancePmd extends BaseEntity {
 
  @Column({ name: 'numero_tranche' , nullable:true })
  numeroTranche: number=0;

  @Column({ name: 'periode'  , nullable:true })
  periode!: string;

  @Column({ name: 'date_echeance', type: 'date' })
  dateEcheance!: Date;


  @Column({ name: 'cours_devise', type: 'decimal',precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer()  })
  coursDevise:  Decimal = new Decimal(0);


  @Column({ name: 'prime', type: 'decimal', precision: 18, scale: 5, default: '0', transformer: new DecimalTransformer() })
  prime: Decimal = new Decimal(0);

  // @Column({ name: 'is_placement', default: false })
  // isPlacement: boolean=false;

  @Column({ name: 'is_annule', default: false })
  isAnnule: boolean=false;

  @Column({ name: 'echeance_pmd_id_annule', nullable: true })
  echeancePmdIdAnnule?: number;


/////////// RELATIONS ///////

  @ManyToOne(() => Devise , {eager:true})
  @JoinColumn({ name: 'devise_id' })
  devise!: Devise;
  @Column({ name: 'devise_id' })
  deviseId!: number;

  @ManyToOne(() => Quittance , { eager: true, onDelete:'CASCADE'})
  @JoinColumn({ name: 'quittance_id' })
  quittance!: Quittance;
  @Column({ name: 'quittance_id' })
  quittanceId!: number;

  @ManyToOne(() => QuittancePlacement, { nullable: true  , onDelete:'CASCADE'})
  @JoinColumn({ name: 'quittance_placement_id' })
  quittancePlacement?: QuittancePlacement;
  @Column({ name: 'quittance_placement_id', nullable: true })
  quittancePlacementId?: number;

  // @ManyToOne(() => Acteur)
  // @JoinColumn({ name: 'acteur_id' })
  // acteur!: Acteur;
  // @Column({ name: 'acteur_id' })
  // acteurId!: number;


  @OneToMany(() => NoteDebitCredit, (b) => b.echeancePmd)
  notesDebitCredit!: NoteDebitCredit[];
}
