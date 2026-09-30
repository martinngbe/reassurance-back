import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { CompteTraite } from './compte-traite.entity';

/** Ligne de mouvement (débit/crédit) d'un compte traité. */
@Entity('compte_traite_detail')
export class CompteTraiteDetail extends BaseEntity {
  @ManyToOne(() => CompteTraite)
  @JoinColumn({ name: 'compte_traite_id' })
  compteTraite!: CompteTraite;

  @Column({ name: 'compte_traite_id' })
  compteTraiteId!: number;

  @Column({ name: 'code_rubrique' })
  codeRubrique!: string;

  @Column({ name: 'libelle_rubrique' })
  libelleRubrique!: string;

  @Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
  debit: number=0;

  @Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
  credit: number=0;


  @Column({ name: 'is_annule', default: false })
  isAnnule: boolean=false;

  @Column({ name: 'compte_traite_detail_id_annule', nullable: true })
  compteTratieDetailIdAnnule?: number;
}
