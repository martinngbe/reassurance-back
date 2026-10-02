import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Sinistre } from './sinistre.entity';
import { Acteur } from '../../acteurs/entities/acteur.entity';
import { SinistreReglementDetail } from './sinistre-reglement-detail.entity';
import { SinistreReglementCession } from './sinistre-reglement-cession.entity';

/** Règlement d'un sinistre par la cédante / via le courtier. */
@Entity('sinistre_reglement')
export class SinistreReglement extends BaseEntity {
  @ManyToOne(() => Sinistre)
  @JoinColumn({ name: 'sinistre_id' })
  sinistre!: Sinistre;

  @Column({ name: 'sinistre_id' })
  sinistreId!: number;

  @ManyToOne(() => Acteur)
  @JoinColumn({ name: 'acteur_cedante_id' })
  acteurCedante!: Acteur;

  @Column({ name: 'acteur_cedante_id' })
  acteurCedanteId!: number;

  @ManyToOne(() => Acteur, { nullable: true })
  @JoinColumn({ name: 'acteur_courtier_id' })
  acteurCourtier?: Acteur;

  @OneToMany(() => SinistreReglementDetail, (qc) => qc.sinistreReglement, {cascade: true,})
  sinistreReglement!: SinistreReglementDetail[];

  @OneToMany(() => SinistreReglementCession, (qc) => qc.sinistreReglement, {cascade: true,})
  sinistreReglementCession!: SinistreReglementCession[];


  @Column({ name: 'acteur_courtier_id', nullable: true })
  acteurCourtierId?: number;

  @Column({ name: 'devise_id' })
  deviseId!: number;

  @Column({ name: 'cours_devise', type: 'decimal', precision: 18, scale: 6 })
  coursDevise: number=0;

  @Column({ type: 'decimal', precision: 18, scale: 2 })
  montant: number=0;

  @Column({ name: 'is_annule', default: false })
  isAnnule: boolean=false;

  @Column({ name: 'sinistre_reglement_id_annule', nullable: true })
  sinistreReglementIdAnnule?: number;
}
