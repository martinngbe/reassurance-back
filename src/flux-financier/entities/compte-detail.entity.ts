import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Compte } from './compte.entity';
import { CompteRubrique } from './compte-rubrique.entity';

/** Ligne de mouvement (débit/crédit) d'un compte traité. */
@Entity('compte_detail')
export class CompteDetail extends BaseEntity {
  @ManyToOne(() => Compte)
  @JoinColumn({ name: 'compte_id' })
  compte!: Compte;
  @Column({ name: 'compte_id' })
  compteId!: number;
  
  @ManyToOne(() => CompteRubrique)
  @JoinColumn({ name: 'compte_rubrique_id' })
  compteRubrique!: CompteRubrique;
  @Column({ name: 'compte_rubrique_id' })
  compteRubriqueId!: number;
  
  @Column({ name: 'devise_id' })
  deviseId!: number;

  @Column({ name: 'cours_devise', type: 'decimal', precision: 18, scale: 5 })
  coursDevise: number = 0;


  @Column({ type: 'decimal', precision: 18, scale: 5, default: 0 })
  debit: number=0;

  @Column({ type: 'decimal', precision: 18, scale: 5, default: 0 })
  credit: number=0;


  @Column({ name: 'is_annule', default: false })
  isAnnule: boolean=false;

  @Column({ name: 'compte_detail_id_annule', nullable: true })
  compteTratieDetailIdAnnule?: number;
}
