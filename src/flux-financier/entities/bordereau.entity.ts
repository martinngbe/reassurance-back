import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Unique } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Quittance } from '../../quittances/entities/quittance.entity';
import { QuittancePlacement } from '../../quittances/entities/quittance-placement.entity';
import { NoteDebitCredit } from './note-debit-credit.entity';
import Decimal from 'decimal.js';
import { DecimalTransformer } from 'src/common/transformers/decimal.transformer';
import { Devise } from 'src/referentiel/entities/devise.entity';

/** Bordereau de primes ou de sinistres (FAC), manuel ou généré. 
 *  Dans la zonz CIMA, l'habitude opérationnelle rattache systématiquement
 *  la notion de Bordereau aux affaires Facultative.
 *  Le borderau reprend les grandes lignes de la Quittance 
 * 
*/
@Entity('bordereau')
export class Bordereau extends BaseEntity {

  @Column({ nullable: true })
  numero!: string

  // la référence chez le client
  @Column({ nullable: true })
  reference!: string  

  @Column({ name: 'date_reception', type: 'date' , nullable:true})
  dateReception?: Date;

  @Column({ name: 'periode_debut', type: 'date' , nullable:true})
  periodeDebut?: Date;

  @Column({ name: 'periode_fin', type: 'date' , nullable: true})
  periodeFin?: Date;



  @Column({ name: 'cours_devise', type: 'decimal',precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer()  })
  coursDevise:  Decimal = new Decimal(0);

  @Column({ name: 'prime_brute',  type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer() })
  primeBrute:  Decimal = new Decimal(0);

  @Column({ name: 'prime_nette',  type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer() })
  primeNette: Decimal = new Decimal(0);
  

  @Column({ name: 'taux_cedante', type: 'decimal', precision: 9, scale: 4, default: 0, transformer: new DecimalTransformer()})
  tauxCedante: Decimal = new Decimal(0);

  @Column({ name: 'taux_accepte',  type: 'decimal', precision: 9, scale: 4, default: 0, transformer: new DecimalTransformer() })
  tauxAccepte: Decimal = new Decimal(0);
  
  // Rattaché à QuittancePlacement
  @Column({ name: 'taux_cession',  type: 'decimal', precision: 9, scale: 4, default: 0, transformer: new DecimalTransformer() })
  tauxCession: Decimal = new Decimal(0);
  


  @Column({ name: 'commission_fixe',   type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer()  })
  commissionFixe: Decimal = new Decimal(0); 
  
  @Column({ name: 'taux_commission', type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer() })
  tauxCommission: Decimal = new Decimal(0);
  
  @Column({ name: 'taxe_sur_commission', type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer()})
  taxeSurCommission: Decimal = new Decimal(0);

  @Column({ name: 'taxe_sur_prime',  type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer() })
  taxeSurPrime: Decimal = new Decimal(0);

  @Column({ name: 'prime_cedee', type: 'decimal', precision: 18, scale: 5, default: '0', transformer: new DecimalTransformer() })
  primeCedee: Decimal = new Decimal(0);

  @Column({ name: 'prime_acceptee', type: 'decimal', precision: 18, scale: 5, default: '0', transformer: new DecimalTransformer() })
  primeAcceptee: Decimal = new Decimal(0);


  @Column({ name: 'is_manuel', default: false })
  isManuel: boolean=false;

  @Column({ name: 'is_annule', default: false })
  isAnnule: boolean=false;

  @Column({ name: 'bordereau_id_annule', nullable: true })
  bordereauIdAnnule!: number;

  /// Realation
  @ManyToOne(() => Devise , {eager:true})
  @JoinColumn({ name: 'devise_id' })
  devise!: Devise;
  @Column({ name: 'devise_id' })
  deviseId!: number;


  // Le bordereau est toujours rattaché à une quittance
  @ManyToOne(() => Quittance, { eager:true , onDelete:'CASCADE' })
  @JoinColumn({ name: 'quittance_id' })
  quittance!: Quittance;
  @Column({ name: 'quittance_id', nullable: true })
  quittanceId!: number;

 
  @ManyToOne(() => QuittancePlacement, { nullable: true  , onDelete:'CASCADE' })
  @JoinColumn({ name: 'quittance_placement_id' })
  quittancePlacement?: QuittancePlacement;
  @Column({ name: 'quittance_placement_id', nullable: true })
  quittancePlacementId?: number;

  @OneToMany(() => NoteDebitCredit, (b) => b.bordereau)
  notesDebitCredit!: NoteDebitCredit[];

  
}
