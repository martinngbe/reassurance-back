import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { QuittancePlacement } from '../../quittances/entities/quittance-placement.entity';
import { CompteType } from '../../referentiel/entities/compte-type.entity';
import { Quittance } from 'src/quittances/entities/quittance.entity';
import { NoteDebitCredit } from './note-debit-credit.entity';
import { TempCompteDetail } from './temp-compte-detail.entity';
import Decimal from 'decimal.js';
import { DecimalTransformer } from 'src/common/transformers/decimal.transformer';

/** Compte courant de traité (position d'un acteur sur un traité donné). 
 * Contient le solde CompteDetail. 
 * Le solde peut être en notre faveur ou pas.
 * Génère une NoteDebitCredit
*/

@Entity('temp_compte')
export class TempCompte extends BaseEntity {

  /// Finance
  @Column({ name: 'devise_id' })
  deviseId!: number;
  @Column({ name: 'cours_devise',type: 'decimal', precision: 9, scale: 4, default: 0, transformer: new DecimalTransformer()})
  coursDevise:Decimal = new Decimal(0);

  // provient de CompteDetail.
  @Column({ type: 'decimal', precision:18, scale:5, default: 0, transformer: new DecimalTransformer()})
  solde: Decimal = new Decimal(0);

  
  @Column({ name: 'is_en_notre_faveur', default: false })
  isEnNotreFaveur: boolean=false;


  // Annulation  
  @Column({ name: 'is_annule', default: false })
  isAnnule: boolean=false;

  @Column({ name: 'compte_id_annule', nullable: true })
  compteIdAnnule?: number;





    /// Relaltion Quittance
  @ManyToOne(() => Quittance , {eager:true , onDelete:'CASCADE'})
  @JoinColumn({ name: 'quittance_id' })
  quittance?: Quittance;
  @Column({ name: 'quittance_id' })
  quittanceId?: number;
  /// Relation QuittancePlacement
  @ManyToOne(() => QuittancePlacement, { nullable: true })
  @JoinColumn({ name: 'quittance_placement_id' })
  quittancePlacement?: QuittancePlacement;
  @Column({ name: 'quittance_placement_id', nullable: true })
  quittancePlacementId?: number;

  @OneToMany(() => NoteDebitCredit, (b) => b.compte)
  notesDebitCredit!: NoteDebitCredit[];

  @OneToMany(() => TempCompteDetail, (b) => b.compte)
  compteDetails!: TempCompteDetail[];


  @ManyToOne(() => CompteType , {eager:true})
  @JoinColumn({ name: 'compte_type_id' })
  compteType!: CompteType;
  @Column({ name: 'compte_type_id' })
  compteTypeId!: number;

}
