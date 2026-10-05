import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { SousBranche } from '../../referentiel/entities/sous-branche.entity';
import { Acteur } from '../../acteurs/entities/acteur.entity';
import { Assure } from '../../acteurs/entities/assure.entity';

/**
 * Police d'assurance cédée en réassurance (acceptation ou cession selon
 * isCession). Rattachée à une sous-branche, à la cédante, au courtier
 * éventuel et à l'assuré.
 */
@Entity('police')
export class Police extends BaseEntity {
  @Column()
  numero!: string;

  @Column({ name: 'is_cession', default: false })
  isCession: boolean=false;

  @Column({ name: 'is_reconduction_tacite', default: false })
  isReconductionTacite: boolean=false;

  // Relation SousBranche
  @ManyToOne(() => SousBranche)
  @JoinColumn({ name: 'id_sous_branche' })
  sousBranche!: SousBranche;
  @Column({ name: 'sous_branche_id' })
  sousBrancheId!: number;

  // Relation Cedente
  @ManyToOne(() => Acteur)
  @JoinColumn({ name: 'acteur_cedante_id' })
  acteurCedante!: Acteur;
  @Column({ name: 'acteur_cedante_id' })
  acteurCedanteId!: number;

// Relation courtier
  @ManyToOne(() => Acteur, { nullable: true })
  @JoinColumn({ name: 'acteur_courtier_id' })
  acteurCourtier?: Acteur;
  @Column({ name: 'acteur_courtier_id', nullable: true })
  acteurCourtierId?: number;

  // Relation courtier
  @ManyToOne(() => Assure, { nullable: true })
  @JoinColumn({ name: 'assure_id' })
  assure!: Assure;
  @Column({ name: 'assure_id' })
  assureId!: number;
}
