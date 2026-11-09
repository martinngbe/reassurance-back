import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Compte } from './compte.entity';
import Decimal from 'decimal.js';
import { DecimalTransformer } from 'src/common/transformers/decimal.transformer';
import { CompteRubrique } from './compte-rubrique.entity';

/** Ligne de mouvement (débit/crédit) d'un compte traité. */
@Entity('compte_detail')
export class CompteDetail extends BaseEntity {

  
  @Column({ name: 'devise_id' })
  deviseId!: number;
  @Column({ name: 'cours_devise',type: 'decimal', precision: 9, scale: 4, default: 0, transformer: new DecimalTransformer()})
  coursDevise:  Decimal = new Decimal(0);


  @Column({type: 'decimal', precision: 18, scale: 5, default: 0, transformer: new DecimalTransformer()})
  debit: Decimal = new Decimal(0);

  @Column({ type: 'decimal', precision: 18, scale: 5, default: 0, transformer: new DecimalTransformer()})
  credit: Decimal = new Decimal(0);


  @Column({ name: 'is_annule', default: false })
  isAnnule: boolean=false;

  @Column({ name: 'compte_detail_id_annule', nullable: true })
  compteTratieDetailIdAnnule?: number;



  ////// RELATION
  @ManyToOne(() => Compte ,{eager:true , onDelete:'CASCADE'})
  @JoinColumn({ name: 'compte_id' })
  compte!: Compte;
  @Column({ name: 'compte_id' })
  compteId!: number;
  
  @ManyToOne(() => CompteRubrique , {eager:true})
  @JoinColumn({ name: 'compte_rubrique_id' })
  compteRubrique!: CompteRubrique;
  @Column({ name: 'compte_rubrique_id' })
  compteRubriqueId!: number;
}
