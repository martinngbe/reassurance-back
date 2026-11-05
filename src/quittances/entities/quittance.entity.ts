import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Mouvement } from '../../referentiel/entities/mouvement.entity';
import { Devise } from 'src/referentiel/entities/devise.entity';
import { Police } from 'src/polices/entities/police.entity';
import { ObjetAssure } from './objet-assure.entity';
import Decimal from 'decimal.js';
import { DecimalTransformer } from 'src/common/transformers/decimal.transformer';
import { QuittancePlacement } from './quittance-placement.entity';


@Entity('quittance')
export class Quittance extends BaseEntity {
  @Column({nullable:true})
  numero!: string;

  @ManyToOne(() => Mouvement , {eager:true})
  @JoinColumn({ name: 'mouvement_id' })
  mouvement!: Mouvement;
  @Column({ name: 'mouvement_id' })
  mouvementId!: number;

  @ManyToOne(() => Police , {eager:true, onDelete: 'CASCADE' , onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'police_id' })
  police!: Police;
  @Column({ name: 'police_id' })
  policeId!: number;


  @ManyToOne(() => Devise , {eager:true})
  @JoinColumn({ name: 'devise_id' })
  devise!: Devise;
  @Column({ name: 'devise_id' })
  deviseId!: number;

  @Column({ name: 'cours_devise',  type: 'decimal', precision: 9, scale: 4, default: 0, transformer: new DecimalTransformer() })
  coursDevise:Decimal = new Decimal(0);

  @CreateDateColumn({ name: 'date_emission' })
  dateEmission!: Date;

  @Column({ name: 'date_effet', type: 'date' , nullable:true})
  dateEffet?: Date;

  @Column({ name: 'date_echeance', type: 'date' , nullable: true})
  dateEcheance?: Date;

  // Nombre de jours avant l'échéance pour l'envoi de mail
  @Column({ name: 'avis_echeance', type: 'int' })
  avisEcheance: Decimal = new Decimal(0);

  // Capitaux souscrits
  @Column({ name: 'capitaux',  type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer() })
  capitaux: Decimal = new Decimal(0);

  // Sinistre Ici (Intérêt le plus important)
  @Column({ name: 'lci',  type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer() })
  lci: Decimal = new Decimal(0);

  // Sinistre Maximum Possible
  @Column({ name: 'smp',  type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer() })
  smp: Decimal = new Decimal(0);

  // Plafond du réassureur
  @Column({ name: 'limite',  type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer() })
  limite: Decimal = new Decimal(0);

  // Autoconservation de la cédante
  @Column({ name: 'retention',  type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer() })
  retention: Decimal = new Decimal(0);

  // Conservation du réassureur
  @Column({ name: 'conservation',  type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer() })
  conservation: Decimal = new Decimal(0);

  // Capacité totale du traité
  @Column({ name: 'capacite',  type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer() })
  capacite: Decimal = new Decimal(0);

 
  @Column({ name: 'nombre_plein',  type: 'decimal', precision: 9, scale: 4, default: 0, transformer: new DecimalTransformer() })
  nombrePlein: Decimal = new Decimal(0);

  // Prime théorique estimée
  @Column({ name: 'estimation_prime',  type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer() })
  estimationPrime: Decimal = new Decimal(0);




  // % de la police cédée
  @Column({ name: 'taux_cedante', type: 'decimal', precision: 9, scale: 4, default: 0, transformer: new DecimalTransformer()})
  tauxCedante: Decimal = new Decimal(0);

  // % accepté par le réassureur
  @Column({ name: 'taux_accepte',  type: 'decimal', precision: 9, scale: 4, default: 0, transformer: new DecimalTransformer() })
  tauxAccepte: Decimal = new Decimal(0);

  //
  // @Column({ name: 'taux_cession',  type: 'decimal', precision: 9, scale: 4, default: 0, transformer: new DecimalTransformer() })
  // tauxCession: Decimal = new Decimal(0);

  // @Column({ name: 'taux_retention',  type: 'decimal', precision: 9, scale: 4, default: 0, transformer: new DecimalTransformer() })
  // tauxRetention: Decimal = new Decimal(0);

  @Column({ name: 'commission_fixe',   type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer()  })
  commissionFixe: Decimal = new Decimal(0); 

   // % commission de réassurance
  // @Column({ name: 'taxe_commission_fixe', type: 'decimal', precision: 9, scale: 4, default: 0, transformer: new DecimalTransformer() })
  // taxeSurCommissionFixe: Decimal = new Decimal(0);




  // % commission de réassurance
  @Column({ name: 'taux_commission', type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer() })
  tauxCommission: Decimal = new Decimal(0);

  // Taxe sur commission
  @Column({ name: 'taxe_sur_commission', type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer()})
  taxeSurCommission: Decimal = new Decimal(0);


  // Prime brute avant commission
  @Column({ name: 'prime_brute',  type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer() })
  primeBrute: Decimal = new Decimal(0);

  // Prime nette après commission
  @Column({ name: 'prime_nette',  type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer() })
  primeNette: Decimal = new Decimal(0);

  // Taxe sur prime brute
  @Column({ name: 'taxe_sur_prime',  type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer() })
  taxeSurPrime: Decimal = new Decimal(0);

  // quittance.entity.ts — à ajouter
  @Column({ name: 'prime_cedee', type: 'decimal', precision: 18, scale: 5, default: '0', transformer: new DecimalTransformer() })
  primeCedee: Decimal = new Decimal(0);

  @Column({ name: 'prime_acceptee', type: 'decimal', precision: 18, scale: 5, default: '0', transformer: new DecimalTransformer() })
  primeAcceptee: Decimal = new Decimal(0);

  // Nombre d'échéances PMD
  @Column({ name: 'nombre_echeance_pmd', type: 'int' , default:0 })
  nombreEcheancePmd!: number ;

  // Sinistres payés par cédante
  @Column({ name: 'sinistre_au_comptant',  type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer() })
  sinistreAuComptant: Decimal = new Decimal(0);

  // Sinistres déclarés
  @Column({ name: 'avis_sinistre',  type: 'decimal', precision: 9, scale: 4, default: 0, transformer: new DecimalTransformer() })
  avisSinistre: Decimal = new Decimal(0);

  // Sinistres provisionnés
  @Column({ name: 'aliment',  type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer() })
  aliment: Decimal = new Decimal(0);


    // ── NOUVEAUX CHAMPS : métadonnées de calcul ────────────────
  //@Column({ name: 'formule_version', type: 'varchar', length: 20, default: 'v1' })
  //formuleVersion!: string;

  //@Column({ name: 'calcule_le', type: 'datetime', nullable: true })
  //calculeLe?: Date;

  //@Column({ name: 'est_emise', type: 'boolean', default: false })
  //estEmise!: boolean;

  @Column({ name: 'is_annule', type: 'boolean', default: false })
  isAnnule!: boolean;

  @Column({ name: 'quittance_id_annule', nullable:true})
  quittanceIdAnnule!: number

  /**
   * Objets assurés liés à cette quittance.
   * Lors de l'annulation, les objets assurés sont supprimés
   * (pas de copie miroir car ce sont des données descriptives simples).
   */
  @OneToMany(() => ObjetAssure, (oa) => oa.quittance, {
    cascade: ['remove'],
    orphanedRowAction: 'delete',
  })
  objetsAssures!: ObjetAssure[];

   // la liste des placements d'une quittance
   // on charge cette liste automatiquement
  @OneToMany(() => QuittancePlacement, (sa) => sa.quittance , {eager:true})
  quittancePlacements!: QuittancePlacement[];

}