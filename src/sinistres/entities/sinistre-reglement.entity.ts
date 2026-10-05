import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Sinistre } from './sinistre.entity';
import { SinistreReglementDetail } from './sinistre-reglement-detail.entity';
import { SinistreReglementQuittanceCession } from './sinistre-reglement-quittance-cession.entity';
import { SinistreReglementQuittance } from './sinistre-reglement-quittance.entity';

/** Règlement d'un sinistre en parti ou en totalité
 Point de départ pour le règlement d'un sinistre
 On fait le point de ce que l'on veut règler.
 ici on ne précise pas l'acteur. Donc pas de note de débitCrédit
*/
@Entity('sinistre_reglement')
export class SinistreReglement extends BaseEntity {
  ////////  Relation Sinistre
  @ManyToOne(() => Sinistre)
  @JoinColumn({ name: 'sinistre_id' })
  sinistre!: Sinistre;
  @Column({ name: 'sinistre_id' })
  sinistreId!: number;

  ////////  Relation SinistreReglementDetail
  @OneToMany(() => SinistreReglementDetail, (qc) => qc.sinistreReglement, {cascade: true,})
  sinistreReglement!: SinistreReglementDetail[];
  ////////  Relation SinistreReglementQuittanceCession
  @OneToMany(() => SinistreReglementQuittanceCession, (qc) => qc.sinistreReglement, {cascade: true,})
  sinistreReglementQuittanceCession!: SinistreReglementQuittanceCession[];

  @OneToMany(() => SinistreReglementQuittance, (qc) => qc.sinistreReglement, {cascade: true,})
  sinistreReglementQuittance!: SinistreReglementQuittance[];
  
  ////////  Finance
  @Column({ name: 'devise_id' })
  deviseId!: number;

  @Column({ name: 'cours_devise', type: 'decimal', precision: 18, scale: 6 })
  coursDevise: number=0;

  @Column({ type: 'decimal', precision: 18, scale: 2 })
  montant: number=0;

  // Annulation
  @Column({ name: 'is_annule', default: false })
  isAnnule: boolean=false;

  @Column({ name: 'sinistre_reglement_id_annule', nullable: true })
  sinistreReglementIdAnnule?: number;
}
