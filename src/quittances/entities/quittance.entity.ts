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


@Entity('quittance')
export class Quittance extends BaseEntity {
  @Column({nullable:true})
  numero!: string;

  @ManyToOne(() => Mouvement , {eager:true})
  @JoinColumn({ name: 'mouvement_id' })
  mouvement!: Mouvement;
  @Column({ name: 'mouvement_id' })
  mouvementId!: number;

  @ManyToOne(() => Police , {eager:true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'police_id' })
  police!: Police;

  @Column({ name: 'police_id' })
  policeId!: number;


  @ManyToOne(() => Devise , {eager:true})
  @JoinColumn({ name: 'devise_id' })
  devise!: Devise;
  @Column({ name: 'devise_id' })
  deviseId!: number;

  @Column({ name: 'cours_devise', type: 'decimal', precision: 18, scale:5 , default:0 })
  coursDevise!: number;

  @CreateDateColumn({ name: 'date_emission' })
  dateEmission!: Date;

  @Column({ name: 'date_effet', type: 'date' , nullable:true})
  dateEffet?: Date;

  @Column({ name: 'date_echeance', type: 'date' , nullable: true})
  dateEcheance?: Date;

  // Nombre de jours avant l'échéance pour l'envoi de mail
  @Column({ name: 'avis_echeance', type: 'int' })
  avisEcheance!: number ;

  // Capitaux souscrits
  @Column({ name: 'capitaux', type: 'decimal', precision: 18, scale:5 , default:0 })
  capitaux!: number ;

  // Sinistre Ici (Intérêt le plus important)
  @Column({ name: 'lci', type: 'decimal', precision: 18, scale:5 , default:0 })
  lci!: number ;

  // Sinistre Maximum Possible
  @Column({ name: 'smp', type: 'decimal', precision: 18, scale:5 , default:0 })
  smp!: number;

  // Plafond du réassureur
  @Column({ name: 'limite', type: 'decimal', precision: 18, scale:5 , default:0 })
  limite!: number ;

  // Autoconservation de la cédante
  @Column({ name: 'retention', type: 'decimal', precision: 18, scale:5 , default:0 })
  retention!: number;

  // Conservation du réassureur
  @Column({ name: 'conservation', type: 'decimal', precision: 18, scale:5 , default:0 })
  conservation!: number ;

  // Capacité totale du traité
  @Column({ name: 'capacite', type: 'decimal', precision: 18, scale:5 , default:0 })
  capacite!: number;

 
  @Column({ name: 'nombre_plein', type: 'decimal', precision: 18, scale:5 , default:0 })
  nombrePlein!: number ;

  // Prime théorique estimée
  @Column({ name: 'estimation_prime', type: 'decimal', precision: 18, scale:5 , default:0 })
  estimationPrime!: number;




  // % de la police cédée
  @Column({ name: 'taux_cedante', type: 'float' , default:0})
  tauxCedante!: number ;

  // % accepté par le réassureur
  @Column({ name: 'taux_accepte', type: 'float', default:0 })
  tauxAccepte!: number;


  @Column({ name: 'taux_cession', type: 'float', default:0 })
  tauxCession!: number ;

  @Column({ name: 'taux_retention', type: 'float', default:0 })
  tauxRetention!: number ;

  @Column({ name: 'commission_fixe',  type: 'decimal', precision: 18, scale:5 , default:0  })
  commissionFixe!: number 

   // % commission de réassurance
  @Column({ name: 'taxe_commission_fixe', type: 'float' , default:0 })
  taxeSurCommissionFixe!: number ;




  // % commission de réassurance
  @Column({ name: 'taux_commission', type: 'float' , default:0 })
  tauxCommission!: number ;

  // Taxe sur commission
  @Column({ name: 'taxe_sur_commission', type: 'float' , default:0})
  taxeSurCommission!: number ;





  // Prime brute avant commission
  @Column({ name: 'prime_brute', type: 'decimal', precision: 18, scale:5 , default:0 })
  primeBrute!: number ;

  // Prime nette après commission
  @Column({ name: 'prime_nette', type: 'decimal', precision: 18, scale:5 , default:0 })
  primeNette!: number ;

  // Taxe sur prime brute
  @Column({ name: 'taxe_sur_prime', type: 'float' , default:0 })
  taxeSurPrime!: number ;


  // Nombre d'échéances PMD
  @Column({ name: 'nombre_echeance_pmd', type: 'int' , default:0 })
  nombreEcheancePmd!: number ;

  

  // Sinistres payés par cédante
  @Column({ name: 'sinistre_au_comptant', type: 'decimal', precision: 18, scale:5 , default:0 })
  sinistreAuComptant!: number ;

  // Sinistres déclarés
  @Column({ name: 'avis_sinistre', type: 'decimal', precision: 18, scale:5 , default:0 })
  avisSinistre!: number ;

  // Sinistres provisionnés
  @Column({ name: 'aliment', type: 'decimal', precision: 18, scale:5 , default:0 })
  aliment!: number ;


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

}