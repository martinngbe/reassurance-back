import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { SinistreStatut } from './sinistre-statut.entity';
import { QuittanceCession } from 'src/quittances/entities/quittance-cession.entity';
import { SinistreQuittance } from './sinistre-quittance.entity';
import { SinistreEvaluation } from './sinistre-evaluation.entity';
import { SinistreReglement } from './sinistre-reglement.entity';
import { Acteur } from 'src/acteurs/entities/acteur.entity';
import { SinistreActeur } from './sinistre-acteur.entity';

@Entity('sinistre')
export class Sinistre extends BaseEntity {

  @Column()
  numero!: string;

  @Column()
  declaration!: string;

  @Column({ name: 'date_survenance' })
  dateSurvenance!: Date;

  @Column({ name: 'lieu_survenance'})
  lieuSurvenance!: string;

  // RELATIONS
  @ManyToOne(() => SinistreStatut)
  @JoinColumn({ name: 'sinistre_statut_id' })
  sinistreStatut!: SinistreStatut;
  @Column({ name: 'sinistre_statut_id' })
  sinistreStatutId!: number;


  @OneToMany(() => SinistreQuittance, (qc) => qc.sinistre, {cascade: true,})
  sinistreQuittance!: SinistreQuittance[];

  @OneToMany(() => SinistreEvaluation, (qc) => qc.sinistre, {cascade: true,})
  sinistreEvaluation!: SinistreEvaluation[];

  @OneToMany(() => SinistreReglement, (qc) => qc.sinistre, {cascade: true,})
  sinistreReglement!: SinistreReglement[];

  
   // Relation Many-to-Many via SinistreActeur
  @OneToMany(() => SinistreActeur, (sa) => sa.sinistre)
  sinistreActeurs!: SinistreActeur[];


}
