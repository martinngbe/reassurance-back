import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Acteur } from './acteur.entity';

@Entity('contact')
export class Contact extends BaseEntity {
  @Column()
  nom!: string;

  @Column()
  prenoms!: string;

  @Column({ name: 'email' })
  email!: string;

  @Column({ name: 'ttelephone' , nullable: true})
  telephone!: string;

  @ManyToOne(() => Acteur, (acteur) => acteur.contacts)
  @JoinColumn({ name: 'acteur_id' })
  acteur!: Acteur;

  @Column({ name: 'acteur_id' })
  acteurId!: number;
}
