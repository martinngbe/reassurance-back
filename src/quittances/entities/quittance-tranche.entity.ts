import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Quittance } from './quittance.entity';
import Decimal from 'decimal.js';
import { DecimalTransformer } from 'src/common/transformers/decimal.transformer';

/**
 * Tranche de repartition des primes * 
 *  Traite XS
 */
@Entity('quittance_tranche')
export class QuittanceTranche extends BaseEntity {

  @Column({name:'numero_tranche' , default:1 })
  numeroTrance!: number;

    // Prime brute avant commission
  @Column({ name: 'prioritee',  type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer() })
  prioritee: Decimal = new Decimal(0);

  // Portee ou Limite
  @Column({ name: 'portee',  type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer() })
  portee: Decimal = new Decimal(0);


  // Prime brute avant commission
  @Column({ name: 'assiette_prime',  type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer() })
  assitettePrime: Decimal = new Decimal(0);

  // Taux sur prime brute
  @Column({ name: 'taux_prime',  type: 'decimal', precision: 9, scale: 4, default: 0, transformer: new DecimalTransformer() })
  tauxPrime: Decimal = new Decimal(0);

  // % commission de réassurance
  @Column({ name: 'taux_commission', type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer() })
  tauxCommission: Decimal = new Decimal(0);

  // Taxe sur commission
  @Column({ name: 'taxe_sur_commission', type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer()})
  taxeSurCommission: Decimal = new Decimal(0);


  @Column({ name: 'is_annule', default: false })
  isAnnule: boolean=false;

  @Column({ name: 'quittance_tranche_id_annule', nullable: true })
  quittanceTrancheIdAnnule!: number;
  


  ///////////////// RELATION
  @ManyToOne(() => Quittance , { eager:false, onDelete:'CASCADE' })
  @JoinColumn({ name: 'quittance_id' })
  quittance!: Quittance;
  @Column({ name: 'quittance_id' })
  quittanceId!: number;



 
}
