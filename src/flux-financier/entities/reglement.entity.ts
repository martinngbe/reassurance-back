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

  @Column({ name: 'reglement_annule_id', nullable: true })
  reglementIdAnnule?: number;

  /**
   * Un règlement possède plusieurs détails (lignes).
   * Chaque détail référence une NoteDebitCredit.
   */
  @OneToMany(() => ReglementDetail, (rd) => rd.reglement, {
    cascade: true,
  })
  reglementDetails: ReglementDetail[]=[];


}


// @Entity('reglement')
// export class Reglement  extends BaseEntity{
 
//   @Column({ name: 'acteur_id', type: 'int' })
//   acteurId!: number;

//   @Column({ name: 'is_courtier', type: 'boolean', default: false })
//   isCourtier: boolean;

//   @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
//   montant: number;

//   @Column({ name: 'is_annule', type: 'boolean', default: false })
//   isAnnule: boolean;

//   @Column({ name: 'id_reglement_annule', type: 'int', nullable: true })
//   idReglementAnnule: number;

//   @CreateDateColumn({ name: 'created_at' })
//   createdAt: Date;

//   @UpdateDateColumn({ name: 'updated_at' })
//   updatedAt: Date;

//   @ManyToOne(() => Acteur, (acteur) => acteur.reglements)
//   @JoinColumn({ name: 'acteur_id' })
//   acteur: Acteur;

//   /**
//    * Un règlement possède plusieurs détails (lignes).
//    * Chaque détail référence une NoteDebitCredit.
//    */
//   @OneToMany(() => ReglementDetail, (rd) => rd.reglement, {
//     cascade: true,
//   })
//   details: ReglementDetail[];
// }