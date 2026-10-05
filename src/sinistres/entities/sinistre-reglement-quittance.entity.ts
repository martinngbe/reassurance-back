import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Sinistre } from './sinistre.entity';
import { SinistreReglement } from './sinistre-reglement.entity';
import { Quittance } from 'src/quittances/entities/quittance.entity';

/** Part cedente d'un règlement de sinistre. 
 * On se prépare à regler la part (tout ou fraction)
 * de la Cédente selon le taux de notre participation
 * Cela déclenche une NoteDebitCredit
 * La table Quittance contient les infos sur l'Acteur
*/
@Entity('sinistre_reglement_quittance')
@Unique(["sinistreId", "sinistreReglementId", "quitanceId"]) // évite les doublons
export class SinistreReglementQuittance extends BaseEntity {
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
 

  // Finance
  @Column({ name: 'devise_id' })
  deviseId!: number;

  @Column({ name: 'cours_devise', type: 'decimal', precision: 20, scale: 5 })
  coursDevise: number=0;

  // Calculé avec part cedante de Quittance
  @Column({ type: 'decimal', precision: 20, scale: 5})
  montant: number=0;


  // Annulation
  @Column({ name: 'is_annule', default: false })
  isAnnule: boolean=false;

  @Column({ name: 'sinistre_reglement_cession_id_annule', nullable: true })
  sinistreReglementQuittanceIdAnnule?: number;
}
