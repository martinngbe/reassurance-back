import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { QuittanceCession } from '../../quittances/entities/quittance-cession.entity';
import { CompteType } from '../../referentiel/entities/compte-type.entity';
import { Acteur } from '../../acteurs/entities/acteur.entity';
import { Quittance } from 'src/quittances/entities/quittance.entity';
import { NoteDebitCredit } from './note-debit-credit.entity';
import { CompteTraiteDetail } from './compte-traite-detail.entity';

/** Compte courant de traité (position d'un acteur sur un traité donné). */
@Entity('compte_traite_rubrique')
export class CompteTraiteRubrique extends BaseEntity {

  @Column({name:'numero_ordre', type:"int"})
  numerOrdre!: number;

  @Column()
  code!: string;

  @Column()
  libelle!: string;
}
