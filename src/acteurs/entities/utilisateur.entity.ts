import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Pays } from '../../referentiel/entities/pays.entity';
import { DomaineActivite } from '../../referentiel/entities/domaine-activite.entity';
import { Contact } from './contact.entity';

/**
 * Toute partie prenante du système : cédante, courtier, réassureur...
 * Les booléens isCourtier / isCompagnieAssurance / isReassureur permettent
 * de qualifier le rôle (un acteur peut cumuler plusieurs rôles).
 */
@Entity('utilisateur')
export class Acteur extends BaseEntity {
  @Column()
  nom!: string 

  @Column({ name: 'raison_sociale' })
  prenoms!: string;


  @Column({ name: 'mot_de_passe' })
  motDePasse!: string;

  @Column()
  email!: string;

  @Column({ name: 'numero_mobile' })
  numeroMobile!: string;

  @Column({ name: 'is_actif', default: false })
  isActif: boolean=false;

}
