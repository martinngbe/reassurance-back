import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Quittance } from './quittance.entity';
import { Acteur } from '../../acteurs/entities/acteur.entity';
import { Bordereau } from 'src/flux-financier/entities/bordereau.entity';
import { EcheancePmd } from 'src/flux-financier/entities/echeance-pmd.entity';
import { Compte } from 'src/flux-financier/entities/compte.entity';
import { NoteDebitCredit } from 'src/flux-financier/entities/note-debit-credit.entity';
import { SinistreQuittance } from 'src/sinistres/entities/sinistre-quittance.entity';
import Decimal from 'decimal.js';
import { DecimalTransformer } from 'src/common/transformers/decimal.transformer';
import { NaturePlacement } from 'src/referentiel/entities/nature-placement.entity';

/**
 * Rétroplacement d'une quittance vers un autre réassureur ("autres
 * réassureurs" dans le diagramme), avec le taux de placement appliqué.
 */
@Entity('quittance_placement')
export class QuittancePlacement extends BaseEntity {

  @Column({nullable:true})
  numero!: string;

  @ManyToOne(() => NaturePlacement , {eager:true})
  @JoinColumn({ name: 'nature_placement_id' })
  naturePlacement!: NaturePlacement; // LEGAL  CONVENTIONNELLE

  @Column({ name: 'nature_placement_id' })
  naturePlacementId!: number;

  
// Prime brute avant commission
  @Column({ name: 'prime_brute',  type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer() })
  primeBrute: Decimal = new Decimal(0);

  // quittance.entity.ts — à ajouter
  @Column({ name: 'prime_cedee', type: 'decimal', precision: 18, scale: 5, default: '0', transformer: new DecimalTransformer() })
  primeCedee: Decimal = new Decimal(0);

  
  // Prime nette après commission
  @Column({ name: 'prime_nette',  type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer() })
  primeNette: Decimal = new Decimal(0);

  @Column({ name: 'commission_fixe',   type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer()  })
  commissionFixe: Decimal = new Decimal(0); 

  

  // Taxe sur prime brute
  @Column({ name: 'taxe_sur_prime',  type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer() })
  taxeSurPrime: Decimal = new Decimal(0);


  @Column({ name: 'taux_cession',  type: 'decimal', precision: 9, scale: 4, default: 0, transformer: new DecimalTransformer() })
  tauxCession: Decimal = new Decimal(0);

  // % commission de réassurance
  @Column({ name: 'taux_commission', type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer() })
  tauxCommission: Decimal = new Decimal(0);

  // Taxe sur commission
  @Column({ name: 'taxe_sur_commission', type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer()})
  taxeSurCommission: Decimal = new Decimal(0);


  @Column({ name: 'is_annule', default: false })
  isAnnule: boolean=false;

  @Column({ name: 'quittance_placement_id_annule', nullable: true })
  quittancePlacementIdAnnule!: number;
  


  ///////////////// RELATION
  @ManyToOne(() => Quittance , { eager:false, onDelete:'CASCADE' })
  @JoinColumn({ name: 'quittance_id' })
  quittance!: Quittance;
  @Column({ name: 'quittance_id' })
  quittanceId!: number;

  @ManyToOne(() => Acteur , { eager:true})
  @JoinColumn({ name: 'acteur_id' })
  acteur!: Acteur;
  @Column({ name: 'acteur_id' })
  acteurId!: number;



  /**
   * Bordereaux générés directement depuis cette quittance placement.
   * Lors de l'annulation, chaque Bordereau est annulé
   */
  @OneToMany(() => Bordereau, (b) => b.quittancePlacement, {cascade: true,})
  bordereaux!: Bordereau[];
  

    /**
   * Bordereaux générés directement depuis cette quittance placement.
   * Lors de l'annulation, chaque Bordereau est annulé
   */
  @OneToMany(() => EcheancePmd, (b) => b.quittancePlacement, {cascade: true,})
  echeancesPmd!: EcheancePmd[];


    /**
     * Échéances PMD liées à cette quittance.
     * Lors de l'annulation, chaque EcheancePmd est annulée
     * (ainsi que ses NotesDebitCredit).
     */
    @OneToMany(() => Compte, (ep) => ep.quittancePlacement, {cascade: true,})
    ComptesTraite!: Compte[];
  
  
    /**
     * Notes de débit/crédit générées directement depuis cette quittancePlacement.
     * Lors de l'annulation, chaque NoteDebitCredit est annulée
     * (ainsi que ses Reglements et ReglementDetails).
     */
    @OneToMany(() => NoteDebitCredit, (ndc) => ndc.quittancePlacement, {cascade: true,})
    notesDebitCredit!: NoteDebitCredit[];
  
 
    /**
     * Liens entre cette quittance et les déclarations de sinistre.
     * Lors de l'annulation, une copie miroir est créée pour la traçabilité.
     */
    @OneToMany(() => SinistreQuittance, (sq) => sq.quittance, {cascade: true,})
    sinistreQuittances!: SinistreQuittance[];
   
}
