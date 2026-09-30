import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

/** Nature du mouvement d'une quittance : Affaire Nouvelle, Avenant, ... */
@Entity('mouvements')
export class Mouvement extends BaseEntity {
  @Column({ unique: true })
  code!: string;

  @Column()
  libelle!: string;
}
