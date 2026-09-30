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
@Entity('polices')
export class Police extends BaseEntity {
  @Column()
  numero!: string;

  @Column({ name: 'is_cession', default: false })
  isCession: boolean=false;

  @Column({ name: 'is_reconduction_tacite', default: false })
  isReconductionTacite: boolean=false;

  @ManyToOne(() => SousBranche)
  @JoinColumn({ name: 'id_sous_branche' })
  sousBranche!: SousBranche;

  @Column({ name: 'id_sous_branche' })
  idSousBranche!: number;

  @ManyToOne(() => Acteur)
  @JoinColumn({ name: 'id_acteur_cedante' })
  acteurCedante!: Acteur;

  @Column({ name: 'id_acteur_cedante' })
  idActeurCedante!: number;

  @ManyToOne(() => Acteur, { nullable: true })
  @JoinColumn({ name: 'id_acteur_courtier' })
  acteurCourtier?: Acteur;

  @Column({ name: 'id_acteur_courtier', nullable: true })
  idActeurCourtier?: number;

  @ManyToOne(() => Assure)
  @JoinColumn({ name: 'id_assure' })
  assure!: Assure;

  @Column({ name: 'id_assure' })
  idAssure!: number;
}
