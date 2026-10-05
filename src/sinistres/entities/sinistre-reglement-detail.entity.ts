import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { SinistreReglement } from './sinistre-reglement.entity';
import { SinistreEvaluation } from './sinistre-evaluation.entity';

/** Ventilation d'un règlement de sinistre sur les évaluations. */
@Entity('sinistre_reglement_detail')
export class SinistreReglementDetail extends BaseEntity {
  @ManyToOne(() => SinistreReglement)
  @JoinColumn({ name: 'sinistre_reglement_id' })
  sinistreReglement!: SinistreReglement;

  @Column({ name: 'sinistre_reglement_id' })
  sinistreReglementId!: number;

  @ManyToOne(() => SinistreEvaluation)
  @JoinColumn({ name: 'sinistre_evaluation_id' })
  sinistreEvaluation!: SinistreEvaluation;

  @Column({ name: 'sinistre_evaluation_id' })
  sinistreEvaluationId!: number;


  @Column({ name: 'devise_id' })
  deviseId!: number;

  @Column({ name: 'cours_devise', type: 'decimal', precision: 18, scale: 6 })
  coursDevise: number=0;
  // Par défaut, on affiche le montant sinistreEvaluationId
  // si non une fraction de sinistreEvaluationId
  @Column({ type: 'decimal', precision: 20, scale: 5 })
  montant: number=0;

}
