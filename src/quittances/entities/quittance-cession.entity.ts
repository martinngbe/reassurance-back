import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Quittance } from './quittance.entity';
import { Acteur } from '../../acteurs/entities/acteur.entity';
import { NatureCession } from '../../referentiel/entities/nature-cession.entity';
import { Bordereau } from 'src/flux-financier/entities/bordereau.entity';
import { EcheancePmd } from './echeance-pmd.entity';

/**
 * Rétrocession d'une quittance vers un autre réassureur ("autres
 * réassureurs" dans le diagramme), avec le taux de cession appliqué.
 */
@Entity('quittance_cessions')
export class QuittanceCession extends BaseEntity {
  @ManyToOne(() => Quittance)
  @JoinColumn({ name: 'quittance_id' })
  quittance!: Quittance;

  @Column({ name: 'quittance_id' })
  quittanceId!: number;

  @ManyToOne(() => Acteur)
  @JoinColumn({ name: 'acteur_id' })
  acteur!: Acteur;

  @Column({ name: 'acteur_id' })
  acteurId!: number;

  @ManyToOne(() => NatureCession)
  @JoinColumn({ name: 'id_nature_cession' })
  natureCession!: NatureCession;

  @Column({ name: 'nature_cession_id' })
  natureCessionId!: number;

  @Column({ type: 'float' })
  taux: number=0;

  @Column({ name: 'is_cession', default: true })
  isCession: boolean=false;

  @Column({ name: 'is_proportionnel', default: true })
  isProportionnel: boolean=false;

  @Column({ name: 'is_fac', default: false })
  isFac: boolean=false;

  @Column({ name: 'is_annule', default: false })
  isAnnule: boolean=false;

  @Column({ name: 'quittance_cession_id_annule', nullable: true })
  quittanceCessionIdAnnule!: number;
  


  /**
   * Bordereaux générés directement depuis cette quittance cession.
   * Lors de l'annulation, chaque Bordereau est annulé
   */
  @OneToMany(() => Bordereau, (b) => b.quittanceCession)
  bordereaux!: Bordereau[];
  

    /**
   * Bordereaux générés directement depuis cette quittance cession.
   * Lors de l'annulation, chaque Bordereau est annulé
   */
  @OneToMany(() => EcheancePmd, (b) => b.quittanceCession)
  echeancesPmd!: EcheancePmd[];
}
