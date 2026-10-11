import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Acteur } from '../../acteurs/entities/acteur.entity';
import { ReglementDetail } from './reglement-detail.entity';
/**  Préparation d'un reglement pour un Acteur donnée.
 *  Ce règlement sera rattaché à une ou plusieurs NoteDebitCredit.
 *  Le Reglment peut être partiel
 */
@Entity('reglement')
export class Reglement extends BaseEntity {
  @ManyToOne(() => Acteur)
  @JoinColumn({ name: 'acteur_id' })
  acteur!: Acteur;

  @Column({ name: 'acteur_id' })
  acteurId!: number;

  @Column({ name: 'devise_id' })
  deviseId!: number;

  @Column({ name: 'cours_devise', type: 'decimal', precision: 18, scale: 5 })
  coursDevise: number = 0;
  
  @Column({ type: 'decimal', precision: 18, scale: 5 })
  montant: number=0;

  @Column({ name: 'is_annule', default: false })
  isAnnule: boolean=false;

  @Column({ name: 'reglement_id_annule', nullable: true })
  reglementIdAnnule?: number;

  /**
   * Un règlement possède plusieurs détails (lignes).
   * Chaque détail référence une NoteDebitCredit.
   */
  @OneToMany(() => ReglementDetail, (rd) => rd.reglement, {cascade: true,})
  reglementDetails!: ReglementDetail[];


}
