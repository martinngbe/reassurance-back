// import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
// import { BaseEntity } from '../../common/entities/base.entity';
// import { Mouvement } from '../../referentiel/entities/mouvement.entity';
// import { Police } from '../../polices/entities/police.entity';

// /**
//  * Quittance d'acceptation ou de cession de réassurance (proportionnelle,
//  * non proportionnelle ou facultative selon isProportionnel / isFac).
//  * Entité centrale du modèle, reprise telle quelle des diagrammes
//  * REASSURANCE-ACCEPTATION / REASSURANCE-CESSION.
//  */
// @Entity('quittances')
// export class Quittance extends BaseEntity {
//   @Column()
//   numero!: string;

//   @ManyToOne(() => Mouvement)
//   @JoinColumn({ name: 'mouvement_id' })
//   mouvement!: Mouvement;

//   @Column({ name: 'mouvement_id' })
//   mouvementId!: number;

//   @ManyToOne(() => Police)
//   @JoinColumn({ name: 'police_id' })
//   police!: Police;

//   @Column({ name: 'police_id' })
//   policeId!: number;

//   @Column({ name: 'devise_id' })
//   deviseId!: number;

//   // True si cession, false si acceptation
//   @Column({ name: 'is_cession', default: false })
//   isCession: boolean=false;

//   // True si proportionnel, false si non proportionnel
//   @Column({ name: 'is_proportionnel', default: true })
//   isProportionnel: boolean=false;

//   // True si affaire facultative (FAC)
//   @Column({ name: 'is_fac', default: false })
//   isFac: boolean=false;

//   @Column({ name: 'date_emission', type: 'date' })
//   dateEmission!: Date;

//   @Column({ name: 'date_effet', type: 'date' })
//   dateEffet?: Date;

//   @Column({ name: 'date_echeance', type: 'date' })
//   dateEcheance?: Date;

//   @Column({ name: 'cours_devise', type: 'decimal', precision: 18, scale: 6 })
//   coursDevise: number=0;

//   // Nombre de jours avant l'échéance pour l'envoi de mail
//   @Column({ name: 'avis_echeance', type: 'int' })
//   avisEcheance: number=0;

//   // Capitaux souscrits
//   @Column({ name: 'capitaux', type: 'decimal', precision: 18, scale: 2 })
//   capitaux: number=0;

//   @Column({ name: 'limite_capitaux_impliques', type: 'decimal', precision: 18, scale: 2 })
//   limiteCapitauxImpliques: number=0;

//   // Sinistre Ici (Intérêt le plus important)
//   @Column({ name: 'ici', type: 'decimal', precision: 18, scale: 2 })
//   ici: number=0;

//   // Sinistre Maximum Possible
//   @Column({ name: 'smp', type: 'decimal', precision: 18, scale: 2 })
//   smp: number=0;

//   // Plafond du réassureur
//   @Column({ name: 'limite', type: 'decimal', precision: 18, scale: 2 })
//   limite: number=0;

//   // Autoconservation de la cédante
//   @Column({ name: 'retention', type: 'decimal', precision: 18, scale: 2 })
//   retention: number=0;

//   // Conservation du réassureur
//   @Column({ name: 'conservation', type: 'decimal', precision: 18, scale: 2 })
//   conservation: number=0;

//   // Capacité totale du traité
//   @Column({ name: 'capacite', type: 'decimal', precision: 18, scale: 2 })
//   capacite: number=0;

//   // Prime théorique estimée
//   @Column({ name: 'estimation_prime', type: 'decimal', precision: 18, scale: 2 })
//   estimationPrime: number=0;

//   // % de la police cédée
//   @Column({ name: 'taux_cedante', type: 'float' })
//   tauxCedante: number=0;

//   // % accepté par le réassureur
//   @Column({ name: 'taux_accepte', type: 'float' })
//   tauxAccepte: number=0;

//   // % commission de réassurance
//   @Column({ name: 'taux_commission', type: 'float' })
//   tauxCommission: number=0;

//   // Taxe sur commission
//   @Column({ name: 'taxe_sur_commission', type: 'float' })
//   taxeSurCommission: number=0;

//   // Prime brute avant commission
//   @Column({ name: 'prime_brute', type: 'decimal', precision: 18, scale: 2 })
//   primeBrute: number=0;

//   // Prime nette après commission
//   @Column({ name: 'prime_nette', type: 'decimal', precision: 18, scale: 2 })
//   primeNette: number=0;

//   // Taxe sur prime brute
//   @Column({ name: 'taxe_sur_prime', type: 'float' })
//   taxeSurPrime: number=0;

//   // Nombre d'échéances PMD
//   @Column({ name: 'nombre_echeance_pmd', type: 'int' })
//   nombreEcheancePmd: number=0;

//   // Sinistres payés par cédante
//   @Column({ name: 'sinistre_au_comptant', type: 'decimal', precision: 18, scale: 2, default: 0 })
//   sinistreAuComptant: number=0;

//   // Sinistres déclarés
//   @Column({ name: 'avis_sinistre', type: 'decimal', precision: 18, scale: 2, default: 0 })
//   avisSinistre: number=0;

//   // Sinistres provisionnés
//   @Column({ name: 'aliment', type: 'decimal', precision: 18, scale: 2, default: 0 })
//   aliment: number=0;

//   @Column({ name: 'is_annule', default: false })
//   isAnnule: boolean=false;

//   @Column({ name: 'id_quittance_annule', nullable: true })
//   idQuittanceAnnule?: number;
// }
