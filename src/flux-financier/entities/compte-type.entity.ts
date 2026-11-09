import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

/** Compte courant de traité (position d'un acteur sur un traité donné). */
@Entity('compte_type')
export class CompteType extends BaseEntity {

  @Column()
  code!: string;
  @Column()
  libelle!: string;
}
