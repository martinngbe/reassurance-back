import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Quittance } from './quittance.entity';
import { Acteur } from '../../acteurs/entities/acteur.entity';
import { NatureCession } from '../../referentiel/entities/nature-cession.entity';
import { Bordereau } from 'src/flux-financier/entities/bordereau.entity';
import { EcheancePmd } from 'src/flux-financier/entities/echeance-pmd.entity';
import { CompteTraite } from 'src/flux-financier/entities/compte-traite.entity';
import { NoteDebitCredit } from 'src/flux-financier/entities/note-debit-credit.entity';
import { SinistreQuittance } from 'src/sinistres/entities/sinistre-quittance.entity';

/**
 * Rétrocession d'une quittance vers un autre réassureur ("autres
 * réassureurs" dans le diagramme), avec le taux de cession appliqué.
 */
@Entity('quittance_cession')
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
  @JoinColumn({ name: 'nature_cession_id' })
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
  @OneToMany(() => Bordereau, (b) => b.quittanceCession, {cascade: true,})
  bordereaux!: Bordereau[];
  

    /**
   * Bordereaux générés directement depuis cette quittance cession.
   * Lors de l'annulation, chaque Bordereau est annulé
   */
  @OneToMany(() => EcheancePmd, (b) => b.quittanceCession, {cascade: true,})
  echeancesPmd!: EcheancePmd[];


    /**
     * Échéances PMD liées à cette quittance.
     * Lors de l'annulation, chaque EcheancePmd est annulée
     * (ainsi que ses NotesDebitCredit).
     */
    @OneToMany(() => CompteTraite, (ep) => ep.quittanceCession, {cascade: true,})
    ComptesTraite!: CompteTraite[];
  
  
    /**
     * Notes de débit/crédit générées directement depuis cette quittanceCession.
     * Lors de l'annulation, chaque NoteDebitCredit est annulée
     * (ainsi que ses Reglements et ReglementDetails).
     */
    @OneToMany(() => NoteDebitCredit, (ndc) => ndc.quittanceCession, {cascade: true,})
    notesDebitCredit!: NoteDebitCredit[];
  
 
    /**
     * Liens entre cette quittance et les déclarations de sinistre.
     * Lors de l'annulation, une copie miroir est créée pour la traçabilité.
     */
    @OneToMany(() => SinistreQuittance, (sq) => sq.quittance, {cascade: true,})
    sinistreQuittances!: SinistreQuittance[];
   
}
