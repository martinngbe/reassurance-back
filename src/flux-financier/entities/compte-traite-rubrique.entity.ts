import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

/** Compte courant de traité (position d'un acteur sur un traité donné). */
@Entity('compte_traite_rubrique')
export class CompteTraiteRubrique extends BaseEntity {

  @Column({name:'numero_ordre', type:"int"})
  numeroOrdre!: number;

  @Column()
  code!: string;

  @Column()
  libelle!: string;
}
