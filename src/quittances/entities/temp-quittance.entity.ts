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
import { TempObjetAssure } from './temp-objet-assure.entity';
import { TempPolice } from 'src/polices/entities/temp-police.entity';
import { Devise } from 'src/referentiel/entities/devise.entity';


@Entity('temp_quittance')
export class TempQuittance extends BaseEntity {
  @Column({nullable:true})
  numero!: string;

  @ManyToOne(() => Mouvement , {eager:true})
  @JoinColumn({ name: 'mouvement_id' })
  mouvement!: Mouvement;
  @Column({ name: 'mouvement_id' })
  mouvementId!: number;

  @ManyToOne(() => TempPolice)
  @JoinColumn({ name: 'police_id' })
  police!: TempPolice;
  @Column({ name: 'police_id' })
  policeId!: number;

  @ManyToOne(() => Devise , {eager:true})
  @JoinColumn({ name: 'devise_id' })
  devise!: Devise;
  @Column({ name: 'devise_id' })
  deviseId!: number;

  @Column({ name: 'cours_devise', type: 'decimal', precision: 18, scale: 5 })
  coursDevise: number = 0;

  @CreateDateColumn({ name: 'date_emission' })
  dateEmission!: Date;

  @Column({ name: 'date_effet', type: 'date' , nullable:true})
  dateEffet?: Date;

  @Column({ name: 'date_echeance', type: 'date' , nullable: true})
  dateEcheance?: Date;

  // Nombre de jours avant l'échéance pour l'envoi de mail
  @Column({ name: 'avis_echeance', type: 'int' })
  avisEcheance: number = 0;

  // Capitaux souscrits
  @Column({ name: 'capitaux', type: 'decimal', precision: 18, scale: 5 })
  capitaux: number = 0;

  // Sinistre Ici (Intérêt le plus important)
  @Column({ name: 'lci', type: 'decimal', precision: 18, scale: 5 })
  lci: number = 0;

  // Sinistre Maximum Possible
  @Column({ name: 'smp', type: 'decimal', precision: 18, scale: 5 })
  smp: number = 0;

  // Plafond du réassureur
  @Column({ name: 'limite', type: 'decimal', precision: 18, scale: 5 })
  limite: number = 0;

  // Autoconservation de la cédante
  @Column({ name: 'retention', type: 'decimal', precision: 18, scale: 5 })
  retention: number = 0;

  // Conservation du réassureur
  @Column({ name: 'conservation', type: 'decimal', precision: 18, scale: 5 })
  conservation: number = 0;

  // Capacité totale du traité
  @Column({ name: 'capacite', type: 'decimal', precision: 18, scale: 5 })
  capacite: number = 0;

   
  @Column({ name: 'nombre_plein', type: 'decimal', precision: 18, scale: 5 })
  nombrePlein: number = 0;


  // Prime théorique estimée
  @Column({ name: 'estimation_prime', type: 'decimal', precision: 18, scale: 5 })
  estimationPrime: number = 0;

  // % de la police cédée
  @Column({ name: 'taux_cedante', type: 'float' })
  tauxCedante: number = 0;

  // % accepté par le réassureur
  @Column({ name: 'taux_accepte', type: 'float' })
  tauxAccepte: number = 0;


    // % de la police cédée
  @Column({ name: 'taux_cession', type: 'float' })
  tauxCession: number = 0;

  // % accepté par le réassureur
  @Column({ name: 'taux_retention', type: 'float' })
  tauxRetention: number = 0;



  // % commission de réassurance
  @Column({ name: 'taux_commission', type: 'float' })
  tauxCommission: number = 0;

  // Taxe sur commission
  @Column({ name: 'taxe_sur_commission', type: 'float' })
  taxeSurCommission: number = 0;

  // Prime brute avant commission
  @Column({ name: 'prime_brute', type: 'decimal', precision: 18, scale: 5 })
  primeBrute: number = 0;

  // Prime nette après commission
  @Column({ name: 'prime_nette', type: 'decimal', precision: 18, scale: 5 })
  primeNette: number = 0;

  // Taxe sur prime brute
  @Column({ name: 'taxe_sur_prime', type: 'float' })
  taxeSurPrime: number = 0;

  // Nombre d'échéances PMD
  @Column({ name: 'nombre_echeance_pmd', type: 'int' })
  nombreEcheancePmd: number = 0;

  // Sinistres payés par cédante
  @Column({ name: 'sinistre_au_comptant', type: 'decimal', precision: 18, scale: 5, default: 0 })
  sinistreAuComptant: number = 0;

  // Sinistres déclarés
  @Column({ name: 'avis_sinistre', type: 'decimal', precision: 18, scale: 5, default: 0 })
  avisSinistre: number = 0;

  // Sinistres provisionnés
  @Column({ name: 'aliment', type: 'decimal', precision: 18, scale: 5, default: 0 })
  aliment: number = 0;


  /**
   * Objets assurés liés à cette quittance.
   * Lors de l'annulation, les objets assurés sont supprimés
   * (pas de copie miroir car ce sont des données descriptives simples).
   */
  @OneToMany(() => TempObjetAssure, (oa) => oa.tempQuittance, {
    cascade: ['remove'],
    orphanedRowAction: 'delete',
  })
  objetsAssures!: TempObjetAssure[];

}