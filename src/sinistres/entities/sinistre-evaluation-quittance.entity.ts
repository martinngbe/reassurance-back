import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Quittance } from '../../quittances/entities/quittance.entity';
import { Sinistre } from './sinistre.entity';
import { SinistreTypeEvaluation } from './sinistre-type-evaluation.entity';

/** Ventilation de l'évaluation d'un sinistre sur une quittance d'acceptation. */
@Entity('sinistre_evaluation_quittance')
export class SinistreEvaluationQuittance extends BaseEntity {
  @ManyToOne(() => Quittance)
  @JoinColumn({ name: 'quittance_id' })
  quittance!: Quittance;

  @Column({ name: 'quittance_id' })
  quittanceId!: number;

  @ManyToOne(() => Sinistre)
  @JoinColumn({ name: 'sinistre_id' })
  sinistre!: Sinistre;

  @Column({ name: 'sinistre_id' })
  sinistreId!: number;

  @ManyToOne(() => SinistreTypeEvaluation)
  @JoinColumn({ name: 'sinistre_type_evaluation_id' })
  sinistreTypeEvaluation!: SinistreTypeEvaluation;

  @Column({ name: 'sinistre_type_evaluation_id' })
  sinistreTypeEvaluationId!: number;

  @Column({ name: 'devise_id' })
  deviseId!: number;

  // Calculé avec le taux de la quittance associée
  @Column({ name: 'cours_devise', type: 'decimal', precision: 18, scale: 6 })
  coursDevise: number=0;

  @Column({ type: 'decimal', precision: 18, scale: 2 })
  montant: number=0;
}
