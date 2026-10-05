import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Pays } from '../../referentiel/entities/pays.entity';
import { DomaineActivite } from '../../referentiel/entities/domaine-activite.entity';
import { Contact } from './contact.entity';
import { Sinistre } from 'src/sinistres/entities/sinistre.entity';
import { SinistreActeur } from 'src/sinistres/entities/sinistre-acteur.entity';

/**
 * Toute partie prenante du système : cédante, courtier, réassureur...
 * Les booléens isCourtier / isCompagnieAssurance / isReassureur permettent
 * de qualifier le rôle (un acteur peut cumuler plusieurs rôles).
 */
@Entity('acteur')
export class Acteur extends BaseEntity {
  @Column()
  sigle!: string 

  @Column({ name: 'raison_sociale' })
  raisonSociale!: string;

  @Column()
  email!: string;

  @Column({ name: 'is_courtier', default: false })
  isCourtier: boolean=false;

  @Column({ name: 'is_compagnie_assurance', default: false })
  isCompagnieAssurance: boolean=false;

  @Column({ name: 'is_reassureur', default: false })
  isReassureur: boolean=false;

  @ManyToOne(() => Pays, { nullable: true })
  @JoinColumn({ name: 'pays_id' })
  pays?: Pays;

  @Column({ name: 'pays_id', nullable: true })
  paysId?: number;



  @OneToMany(() => Contact, (contact) => contact.acteur)
  contacts!: Contact[];

  // la liste des sinistres d'un acteur
  // @OneToMany(() => Sinistre, (s) => s.acteurs)
  // sinsitres!: Contact[];
    // Relation Many-to-Many via SinistreActeur
  @OneToMany(() => SinistreActeur, (sa) => sa.acteur)
  sinistreActeurs!: SinistreActeur[];
}
