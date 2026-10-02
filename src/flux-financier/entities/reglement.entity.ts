import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Acteur } from '../../acteurs/entities/acteur.entity';
import { NoteDebitCredit } from './note-debit-credit.entity';
import { ReglementDetail } from './reglement-detail.entity';

@Entity('reglement')
export class Reglement extends BaseEntity {
  @ManyToOne(() => Acteur)
  @JoinColumn({ name: 'acteur_id' })
  acteur!: Acteur;

  @Column({ name: 'acteur_id' })
  acteurId!: number;

  @Column({ name: 'is_courtier', default: false })
  isCourtier: boolean=false;

  @Column({ type: 'decimal', precision: 18, scale: 2 })
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
