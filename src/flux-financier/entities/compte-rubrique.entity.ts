import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

/** Compte courant de traité (position d'un acteur sur un traité donné). */
@Entity('compte_rubrique')
export class CompteRubrique extends BaseEntity {

  @Column({name:'numero_ordre', type:"int" , default:0})
  numeroOrdre!: number;

  @Column()
  code!: string;

  @Column()
  libelle!: string;

  @Column()
  partie!: string;

  @Column({name:'is_proportionnel', default:false})
  isProportionnel!: boolean;

  @Column({name:'is_non_proportionnel', default:false})
  isNonProportionnel!: boolean;

}
