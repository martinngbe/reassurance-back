import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { SinistreReglementDetail } from './sinistre-reglement-detail.entity';
import { SinistreEvaluation } from './sinistre-evaluation.entity';

@Entity('sinistre_reglement_cession_details')
export class SinistreReglementCessionDetail extends BaseEntity {
  @ManyToOne(() => SinistreReglementDetail)
  @JoinColumn({ name: 'id_sinistre_reglement_detail' })
  sinistreReglementDetail!: SinistreReglementDetail;

  @Column({ name: 'id_sinistre_reglement_detail' })
  idSinistreReglementDetail!: number;

  @ManyToOne(() => SinistreEvaluation)
  @JoinColumn({ name: 'sinistre_evaluation_id' })
  sinistreEvaluation!: SinistreEvaluation;

  @Column({ name: 'sinistre_evaluation_id' })
  sinistreEvaluationId!: number;

  @Column({ name: 'devise_id' })
  deviseId!: number;

  @Column({ name: 'cours_devise', type: 'decimal', precision: 18, scale: 6 })
  coursDevise: number=0;

  // Calculé avec le taux de cession de QuittanceCession
  @Column({ type: 'decimal', precision: 18, scale: 2 })
  montant: number=0;

  @Column({ name: 'is_annule', default: false })
  isAnnule: boolean=false;

  @Column({ name: 'id_sinistre_reglement_detail_cession_annule', nullable: true })
  idSinistreReglementDetailCessionAnnule?: number;
}
