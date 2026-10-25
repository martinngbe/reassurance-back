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
import { Police } from '../../polices/entities/police.entity';

// Imports des entités liées pour l'annulation en cascade
// ⚠️ Adaptez les chemins selon votre structure de projet
import { SinistreQuittance } from '../../sinistres/entities/sinistre-quittance.entity';
import { QuittanceCession } from './quittance-cession.entity';
import { Bordereau } from 'src/flux-financier/entities/bordereau.entity';
import { NoteDebitCredit } from 'src/flux-financier/entities/note-debit-credit.entity';
//import { EcheancePmd } from './echeance-pmd.entity';
import { ObjetAssure } from './objet-assure.entity';
import { CompteTraite } from 'src/flux-financier/entities/compte-traite.entity';
import { Acteur } from 'src/acteurs/entities/acteur.entity';
import { EcheancePmd } from 'src/flux-financier/entities/echeance-pmd.entity';
import { TempObjetAssure } from './temp-objet-assure.entity';
import { TempPolice } from 'src/polices/entities/temp-police.entity';
import { Devise } from 'src/referentiel/entities/devise.entity';

/**
 * Quittance d'acceptation ou de cession de réassurance (proportionnelle,
 * non proportionnelle ou facultative selon isProportionnel / isFac).
 * Entité centrale du modèle, reprise telle quelle des diagrammes
 * REASSURANCE-ACCEPTATION / REASSURANCE-CESSION.
 *
 * L'annulation d'une Quittance entraîne l'annulation en cascade de :
 * - QuittanceCession (et leurs dépendances : Bordereau, EcheancePmd, NoteDebitCredit)
 * - Bordereau (et leurs NotesDebitCredit)
 * - EcheancePmd (et leurs NotesDebitCredit)
 * - NoteDebitCredit (et leurs Reglements)
 * - ObjetAssure (suppression)
 * - SinistreQuittance (duplication pour traçabilité)
 * - SinistreEvaluationQuittance (et leurs SinistreEvaluationQuittanceCession)
 */
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
/*
  // True si cession, false si acceptation
  // Provient de Police
  @Column({ name: 'is_cession', default: false })
  isCession: boolean = false;

  // True si proportionnel, false si non proportionnel
  // Provient de Police.NatureOffre
  @Column({ name: 'is_facultative', default: false })
  isFacultative: boolean = false;

  // True si proportionnel, false si non proportionnel
  // Provient de Police.natureOffre
  @Column({ name: 'is_proportionnel', default: true })
  isProportionnel: boolean = false;

  // True si affaire facultative (FAC)
  @Column({ name: 'is_fac', default: false })
  isFac: boolean = false;
*/
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

  //@Column({ name: 'limite_capitaux_impliques', type: 'decimal', precision: 18, scale: 5 })
  //limiteCapitauxImpliques: number = 0;

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

  // Prime théorique estimée
  @Column({ name: 'estimation_prime', type: 'decimal', precision: 18, scale: 5 })
  estimationPrime: number = 0;

  // % de la police cédée
  @Column({ name: 'taux_cedante', type: 'float' })
  tauxCedante: number = 0;

  // % accepté par le réassureur
  @Column({ name: 'taux_accepte', type: 'float' })
  tauxAccepte: number = 0;

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