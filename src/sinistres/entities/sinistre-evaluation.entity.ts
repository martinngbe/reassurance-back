import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Sinistre } from './sinistre.entity';
import { SinistreTypeEvaluation } from './sinistre-type-evaluation.entity';

/** Évaluation (montant) d'un sinistre pour un type d'évaluation donné. 
 * Pour annuler une évaluation, on crée une nouvelle évaluation avec le même type d'évaluation et le même sinistre mais avec un montant négatif.
*/

@Entity('sinistre_evaluation')
export class SinistreEvaluation extends BaseEntity {
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

  @Column({ name: 'cours_devise', type: 'decimal', precision: 18, scale: 5 })
  coursDevise: number=0;

  @Column({ type: 'decimal', precision: 18, scale: 5 })
  montant: number=0;
}
