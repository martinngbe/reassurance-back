import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Sinistre } from './sinistre.entity';
import { SinistreReglement } from './sinistre-reglement.entity';
import { Quittance } from 'src/quittances/entities/quittance.entity';
import { QuittanceCession } from 'src/quittances/entities/quittance-cession.entity';

/** Quote-part cédée d'un règlement de sinistre.
 * On se prépare à regler la Quote-part cédée (tout ou fraction)
 * La table QuittanceCession contient les infos sur l'Acteur
 * Cela déclenche une NoteDebitCredit
*/
@Entity('sinistre_reglement_quittance_cession')
@Unique(["sinistreId", "sinistreReglementId", "quitanceId" ,"quitanceCessionId"]) // évite les doublons
export class SinistreReglementQuittanceCession extends BaseEntity {

  ////////  Relation Sinistre
  @ManyToOne(() => Sinistre)
  @JoinColumn({ name: 'sinistre_id' })
  sinistre!: Sinistre;
  @Column({ name: 'sinistre_id' })
  sinistreId!: number;
 ////////  Relation SinistreReglement
  @ManyToOne(() => SinistreReglement)
  @JoinColumn({ name: 'sinistre_reglement_id' })
  sinistreReglement!: SinistreReglement;
  @Column({ name: 'sinistre_reglement_id' })
  sinistreReglementId!: number;
 ////////  Relation Quittance
  @ManyToOne(() => Quittance)
  @JoinColumn({ name: 'quitance_id' })
  quittance!: Quittance;
  @Column({ name: 'quitance_id' })
  quitanceId!: number;
 ////////  Relation QuittanceCession
  @ManyToOne(() => QuittanceCession)
  @JoinColumn({ name: 'quitance_cession_id' })
  quittanceCession!: QuittanceCession;
  @Column({ name: 'quitance_cession_id' })
  quitanceCessionId!: number;

  //  Finance 
  @Column({ name: 'devise_id' })
  deviseId!: number;

  @Column({ name: 'cours_devise', type: 'decimal', precision: 20, scale: 5 })
  coursDevise: number=0;

  // Calculé avec le taux de cession de QuittanceCession
  @Column({ type: 'decimal', precision: 20, scale: 5})
  montant: number=0;

  // Annulation
  @Column({ name: 'is_annule', default: false })
  isAnnule: boolean=false;

  @Column({ name: 'sinistre_reglement_cession_id_annule', nullable: true })
  sinistreReglementCessionIdAnnule?: number;
}
