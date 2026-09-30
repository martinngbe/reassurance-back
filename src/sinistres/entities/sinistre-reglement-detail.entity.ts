import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { SinistreReglement } from './sinistre-reglement.entity';
import { SinistreEvaluation } from './sinistre-evaluation.entity';

/** Ventilation d'un règlement de sinistre sur les évaluations. */
@Entity('sinistre_reglement_details')
export class SinistreReglementDetail extends BaseEntity {
  @ManyToOne(() => SinistreReglement)
  @JoinColumn({ name: 'id_sinistre_reglement' })
  sinistreReglement!: SinistreReglement;

  @Column({ name: 'id_sinistre_reglement' })
  idSinistreReglement!: number;

  @ManyToOne(() => SinistreEvaluation)
  @JoinColumn({ name: 'sinistre_evaluation_id' })
  sinistreEvaluation!: SinistreEvaluation;

  @Column({ name: 'sinistre_evaluation_id' })
  sinistreEvaluationId!: number;
}
