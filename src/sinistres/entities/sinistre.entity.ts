import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { SinistreStatut } from './sinistre-statut.entity';
import { QuittanceCession } from 'src/quittances/entities/quittance-cession.entity';
import { SinistreQuittance } from './sinistre-quittance.entity';
import { SinistreEvaluation } from './sinistre-evaluation.entity';
import { SinistreReglement } from './sinistre-reglement.entity';

@Entity('sinistre')
export class Sinistre extends BaseEntity {
  @ManyToOne(() => SinistreStatut)
  @JoinColumn({ name: 'sinistre_statut_id' })
  sinistreStatut!: SinistreStatut;

  @Column({ name: 'sinistre_statut_id' })
  sinistreStatutId!: number;

  @Column()
  numero!: string;

  @Column()
  declaration!: string;

  @Column({ name: 'date_survenance' })
  dateSurvenance!: Date;

  @OneToMany(() => SinistreQuittance, (qc) => qc.sinistre, {cascade: true,})
  sinistreQuittance!: SinistreQuittance[];

  @OneToMany(() => SinistreEvaluation, (qc) => qc.sinistre, {cascade: true,})
  sinistreEvaluation!: SinistreEvaluation[];

  @OneToMany(() => SinistreReglement, (qc) => qc.sinistre, {cascade: true,})
  sinistreReglement!: SinistreReglement[];



}
