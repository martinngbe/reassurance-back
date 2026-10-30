import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { SousBranche } from '../../referentiel/entities/sous-branche.entity';
import { Acteur } from '../../acteurs/entities/acteur.entity';
import { Assure } from '../../acteurs/entities/assure.entity';
import { NatureOffre } from 'src/referentiel/entities/nature-offre.entity';
import { TempQuittance } from 'src/quittances/entities/temp-quittance.entity';

/**
 * Police d'assurance cédée en réassurance (acceptation ou cession selon
 * isCession). Rattachée à une sous-branche, à la cédante, au courtier
 * éventuel et à l'assuré.
 */
@Entity('temp_police')
export class TempPolice extends BaseEntity {
  @Column({nullable:true})
  numero!: string;

  @Column({ name: 'is_reconduction_tacite', default: false })
  isReconductionTacite: boolean=false;

  @Column({ name: 'is_iard', default: false })
  isIard!: boolean; // IARD | VIE

  // FAC | TRAITE  
  // On veut reduire le nombre de jointure
  // cette information peut être lu dans NatureOffre
  @Column({ name: 'is_fac', default: false })
  isFac!: boolean; 

  @Column({ name: 'is_cession', default: false })
  isCession: boolean=false;  // CESSION | ACCEPTATION


    // Relation Quittance
  // On charge automatiquement toutes les tempsQuittance de la police
  // On se rassure qu'il n'y aura pas plus de un. car saisie temporaire.
  // la table sera vidée à la fin de la saisie
  @OneToMany(() => TempQuittance, (quittance) => quittance.police , {eager: true, cascade:true})
  quittances!: TempQuittance[];



  @ManyToOne(() => NatureOffre , {eager:true})
  @JoinColumn({ name: 'nature_offre_id'  })
  natureOffre!: NatureOffre;
  @Column({ name: 'nature_offre_id' })
  natureOffreId!: number;


  // Relation SousBranche
  @ManyToOne(() => SousBranche, {eager:true})
  @JoinColumn({ name: 'sous_branche_id' })
  sousBranche!: SousBranche;
  @Column({ name: 'sous_branche_id' })
  sousBrancheId!: number;


  // Relation Cedente
  @ManyToOne(() => Acteur, {eager:true})
  @JoinColumn({ name: 'acteur_cedante_id' })
  acteurCedante!: Acteur;
  @Column({ name: 'acteur_cedante_id' })
  acteurCedanteId!: number;

// Relation courtier
  @ManyToOne(() => Acteur, { nullable: true , eager:true})
  @JoinColumn({ name: 'acteur_courtier_id' })
  acteurCourtier?: Acteur;
  @Column({ name: 'acteur_courtier_id', nullable: true })
  acteurCourtierId?: number;

  // Relation courtier
  @ManyToOne(() => Assure, { nullable: true , eager:true})
  @JoinColumn({ name: 'assure_id' })
  assure!: Assure;
  @Column({ name: 'assure_id' , nullable:true })
  assureId?: number;
}
