import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Quittance } from '../../quittances/entities/quittance.entity';
import { QuittanceCession } from '../../quittances/entities/quittance-cession.entity';
import { Sinistre } from './sinistre.entity';
import { SinistreEvaluation } from './sinistre-evaluation.entity';
import { SinistreTypeEvaluation } from './sinistre-type-evaluation.entity';

/**
 * Évaluation sinistre-cession : provient de SinistreEvaluation, ventilée
 * sur une QuittanceCession avec le taux de cession appliqué.
 */
@Entity('sinistre_evaluation_quittance_cessions')
export class SinistreEvaluationQuittanceCession extends BaseEntity {
  @ManyToOne(() => Quittance)
  @JoinColumn({ name: 'quittance_id' })
  quittance!: Quittance;

  @Column({ name: 'quittance_id' })
  quittanceId!: number;

  @ManyToOne(() => QuittanceCession)
  @JoinColumn({ name: 'quittance_cession_id' })
  quittanceCession!: QuittanceCession;

  @Column({ name: 'quittance_cession_id' })
  quittanceCessionId!: number;

  @ManyToOne(() => SinistreTypeEvaluation)
  @JoinColumn({ name: 'sinistre_type_evaluation_id' })
  sinistreTypeEvaluation!: SinistreTypeEvaluation;

  @Column({ name: 'sinistre_type_evaluation_id' })
  sinistreTypeEvaluationId!: number;

  @ManyToOne(() => Sinistre)
  @JoinColumn({ name: 'sinistre_id' })
  sinistre!: Sinistre;

  @Column({ name: 'sinistre_id' })
  sinistreId!: number;

  @ManyToOne(() => SinistreEvaluation)
  @JoinColumn({ name: 'sinistre_evaluation_id' })
  sinistreEvaluation!: SinistreEvaluation;

  @Column({ name: 'sinistre_evaluation_id' })
  sinistreEvaluationId!: number;

  @Column({ name: 'devise_id' })
  deviseId!: number;

  // Calculé avec le taux de cession
  @Column({ name: 'cours_devise', type: 'decimal', precision: 18, scale: 6 })
  coursDevise: number=0;

  @Column({ type: 'decimal', precision: 18, scale: 2 })
  montant: number=0;

  @Column({ name: 'is_annule', default: false })
  isAnnule: boolean=false;

  @Column({ name: 'sinistre_evaluation_cession_id_annule', nullable: true })
  sinistreEvaluationCessionIdAnnule?: string | null;
}
