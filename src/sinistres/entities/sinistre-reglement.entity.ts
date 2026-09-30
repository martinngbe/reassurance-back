import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Sinistre } from './sinistre.entity';
import { Acteur } from '../../acteurs/entities/acteur.entity';

/** Règlement d'un sinistre par la cédante / via le courtier. */
@Entity('sinistre_reglements')
export class SinistreReglement extends BaseEntity {
  @ManyToOne(() => Sinistre)
  @JoinColumn({ name: 'sinistre_id' })
  sinistre!: Sinistre;

  @Column({ name: 'sinistre_id' })
  sinistreId!: number;

  @ManyToOne(() => Acteur)
  @JoinColumn({ name: 'id_acteur_cedante' })
  acteurCedante!: Acteur;

  @Column({ name: 'id_acteur_cedante' })
  idActeurCedante!: number;

  @ManyToOne(() => Acteur, { nullable: true })
  @JoinColumn({ name: 'id_acteur_courtier' })
  acteurCourtier?: Acteur;

  @Column({ name: 'id_acteur_courtier', nullable: true })
  idActeurCourtier?: number;

  @Column({ name: 'devise_id' })
  deviseId!: number;

  @Column({ name: 'cours_devise', type: 'decimal', precision: 18, scale: 6 })
  coursDevise: number=0;

  @Column({ type: 'decimal', precision: 18, scale: 2 })
  montant: number=0;

  @Column({ name: 'is_annule', default: false })
  isAnnule: boolean=false;

  @Column({ name: 'id_sinistre_reglement_annule', nullable: true })
  idSinistreReglementAnnule?: number;
}
