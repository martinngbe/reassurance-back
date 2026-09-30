import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Acteur } from './acteur.entity';

@Entity('contacts')
export class Contact extends BaseEntity {
  @Column()
  nom!: string;

  @Column()
  prenoms!: string;

  @Column({ name: 'e_mail' })
  eMail!: string;

  @Column({ name: 'numero_telephone' })
  numeroTelephone!: string;

  @ManyToOne(() => Acteur, (acteur) => acteur.contacts)
  @JoinColumn({ name: 'acteur_id' })
  acteur!: Acteur;

  @Column({ name: 'acteur_id' })
  acteurId!: number;
}
