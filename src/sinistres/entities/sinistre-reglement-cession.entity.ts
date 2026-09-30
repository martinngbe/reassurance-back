import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Sinistre } from './sinistre.entity';
import { SinistreReglement } from './sinistre-reglement.entity';

/** Quote-part cédée d'un règlement de sinistre. */
@Entity('sinistre_reglement_cessions')
export class SinistreReglementCession extends BaseEntity {
  @ManyToOne(() => Sinistre)
  @JoinColumn({ name: 'sinistre_id' })
  sinistre!: Sinistre;

  @Column({ name: 'sinistre_id' })
  sinistreId!: number;

  @ManyToOne(() => SinistreReglement)
  @JoinColumn({ name: 'id_sinistre_reglement' })
  sinistreReglement!: SinistreReglement;

  @Column({ name: 'id_sinistre_reglement' })
  idSinistreReglement!: number;

  @Column({ name: 'devise_id' })
  deviseId!: number;

  @Column({ name: 'cours_devise', type: 'decimal', precision: 18, scale: 6 })
  coursDevise: number=0;

  // Calculé avec le taux de cession de QuittanceCession
  @Column({ type: 'decimal', precision: 18, scale: 2 })
  montant: number=0;

  @Column({ name: 'is_annule', default: false })
  isAnnule: boolean=false;

  @Column({ name: 'id_sinistre_reglement_cession_annule', nullable: true })
  idSinistreReglementCessionAnnule?: number;
}
