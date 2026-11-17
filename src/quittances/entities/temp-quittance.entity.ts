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
import { ObjetAssure } from './objet-assure.entity';
import Decimal from 'decimal.js';
import { DecimalTransformer } from 'src/common/transformers/decimal.transformer';
import { TempPolice } from 'src/polices/entities/temp-police.entity';


@Entity('temp_quittance')
export class TempQuittance extends BaseEntity {
   @Column({nullable:true , unique: true, update: false})
   numero!: string;
 
   @ManyToOne(() => Mouvement , {eager:true})
   @JoinColumn({ name: 'mouvement_id' })
   mouvement!: Mouvement;
   @Column({ name: 'mouvement_id' })
   mouvementId!: number;
 
   @ManyToOne(() => TempPolice , { onDelete: 'CASCADE' , onUpdate: 'CASCADE' })
   @JoinColumn({ name: 'police_id' })
   police!: TempPolice;
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
 
   // Plafond du réassureur. Limite (ou Plafond)
   // Définition : Montant maximal au-delà duquel le réassureur ne couvre plus le risque
   // Dans un traité non proportionnel, le plafond est souvent égal à la somme de la priorité et de la portée. 
   // Type d'offre : Utilisé dans tous les types de réassurance, 
   // mais particulièrement crucial en non proportionnelle 
   // (pour définir le haut de la tranche) et en réassurance facultative (limite par risque).
   @Column({ name: 'limite',  type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer() })
   limite: Decimal = new Decimal(0);
 
   // Non proportionnel (ex. Excédent de sinistre)..
   // Définition : Étendue de l'engagement financier du réassureur, 
   // c'est-à-dire le montant maximum qu'il s'engage à payer au-delà de la priorité
   // Type d'offre : Exclusivement utilisée en réassurance non proportionnelle
   //  (Excédent de sinistre / Excess of Loss - XL)
   @Column({ name: 'portee',  type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer() })
   portee: Decimal = new Decimal(0);
 
   //Définition : Montant du sinistre qui reste à la charge de l'assureur cédant avant que le réassureur n'intervienne
   //C'est la borne inférieure de l'engagement du réassureur (souvent assimilée à une franchise).
   //Type d'offre : Spécifique à la réassurance non proportionnelle 
   // (Excédent de sinistre par risque, par événement ou par année)
   @Column({ name: 'priorite',  type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer() })
   priorite: Decimal = new Decimal(0);
 
 
   // La rétention (ou conservation) : 
   // C'est la part du risque que l'assureur décide de garder
   //  uniquement pour lui, sans la réassurer.
   @Column({ name: 'retention',  type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer() })
   retention: Decimal = new Decimal(0);
 
   // Conservation du réassureur
   //
   // Définition : Montant fixe du risque que l'assureur cédant décide de garder pour son propre compte
   //  avant de céder le surplus au réassureur
   //
   // Type d'offre : Concept central de la réassurance proportionnelle en Excédent de plein, 
   // où chaque risque est évalué individuellement par rapport à ce plein.
   @Column({ name: 'conservation',  type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer() })
   conservation: Decimal = new Decimal(0);
 
   // Capacité totale du traité 
   // Proportionnel (ex. Excédent de capitaux, Quote-part).
   // mesure	La valeur maximale du capital assuré sur un risque.
   // 
   // Définition : Montant maximum de risque qu'un réassureur (ou un syndicat de réassureurs) 
   // est prêt à accepter et à garantir sur un portefeuille ou un risque donné
   // Type d'offre : Utilisé dans tous les types d'offres 
   // (Traités proportionnels, Excédent de plein, Excédent de sinistre et Réassurance facultative) 
   // lors de la négociation du programme
   @Column({ name: 'capacite',  type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer() })
   capacite: Decimal = new Decimal(0);
 
    
  
 
   
 
   // Prime théorique estimée (XL  NON PROPORTIONNEL)
   // Offres facultatives lorsque le tarif définitif n'est pas encore arrêté
   // Définition : montant prévisionnel de prime 
   // que l'assureur ou le réassureur estime devoir recevoir 
   // pour une période ou une couverture donnée.
   @Column({ name: 'estimation_prime',  type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer() })
   estimationPrime: Decimal = new Decimal(0);
 
 
 
 
   // % de la police cédée
   @Column({ name: 'taux_cedante', type: 'decimal', precision: 9, scale: 4, default: 0, transformer: new DecimalTransformer()})
   tauxCedante: Decimal = new Decimal(0);
 
   // % accepté par le réassureur
   @Column({ name: 'taux_accepte',  type: 'decimal', precision: 9, scale: 4, default: 0, transformer: new DecimalTransformer() })
   tauxAccepte: Decimal = new Decimal(0);
 
  
   @Column({ name: 'commission_fixe',   type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer()  })
   commissionFixe: Decimal = new Decimal(0); 
 
 
 
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
   // principalement dans les offres facultatives et les traités, 
   // lorsque le paiement de la prime est fractionné.
   // Type d'offre : Commun à tous les contrats, 
   // mais particulièrement suivi dans les traités de réassurance pour
   //  l'ajustement des comptes et la régularisation des primes 
   // en fin d'exercice.
   @Column({ name: 'nombre_echeance_pmd', type: 'int' , default:0 })
   nombreEcheancePmd!: number ;
 
   // ///////////////////////////////
   // réassurance proportionnelle
   // /////////////// EDP ////////////////
   //Le plein : C'est l'unité de mesure utilisée dans 
   // les traités proportionnels pour fixer la rétention maximale 
   // de l'assureur sur un seul risque.
   // Type d'offre : Principalement utilisé en réassurance proportionnelle,
   //  et plus spécifiquement dans les traités en Excédent de plein (Surplus)
   @Column({ name: 'nombre_plein',  type: 'int' , default:0  })
   nombrePlein!: number;
 
   // nombreTranche en XS
   //La tranche (ou "Layer") : 
   // C'est un étage de couverture. Les assureurs empilent souvent
   //  plusieurs tranches successives auprès de différents 
   // réassureurs pour couvrir les catastrophes majeures
   @Column({ name: 'nombre_tranche', type: 'int' , default:0 })
   nombreTranche!: number ;
 
 
   // Sinistres payés par cédante
   @Column({ name: 'sinistre_au_comptant',  type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer() })
   sinistreAuComptant: Decimal = new Decimal(0);
 
   // Sinistres déclarés
   @Column({ name: 'avis_sinistre',  type: 'decimal', precision: 9, scale: 4, default: 0, transformer: new DecimalTransformer() })
   avisSinistre: Decimal = new Decimal(0);
 
   // Sinistres provisionnés
   @Column({ name: 'aliment',  type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer() })
   aliment: Decimal = new Decimal(0);
 
 
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
 /*
    // la liste des placements d'une quittance
    // on charge cette liste automatiquement
   @OneToMany(() => QuittancePlacement, (sa) => sa.quittance , {eager:true})
   quittancePlacements!: QuittancePlacement[];
 
 
   @OneToMany(() => Bordereau, (sa) => sa.quittance , {eager:true})
   bordereaux!: Bordereau[];
 
   @OneToMany(() => Compte, (sa) => sa.quittance , {eager:true})
   comptes!: Compte[];
 
   @OneToMany(() => EcheancePmd, (sa) => sa.quittance , {eager:true})
   echeancesPmd!: EcheancePmd[];
 
*/ 
}