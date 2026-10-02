import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { DomaineActivite } from 'src/referentiel/entities/domaine-activite.entity';
import { Pays } from 'src/referentiel/entities/pays.entity';

@Entity('assure')
export class Assure extends BaseEntity {
  @Column()
  sigle!: string;

  @Column({ name: 'raison_sociale' })
  raisonSociale!: string;

  @Column()
  email!: string;
  
  @ManyToOne(() => Pays, { nullable: true })
  @JoinColumn({ name: 'pays_id' })
  pays?: Pays;

  @Column({ name: 'pays_id', nullable: true })
  paysId?: number;

  @ManyToOne(() => DomaineActivite, { nullable: true })
  @JoinColumn({ name: 'domaine_activite_id' })
  domaineActivite?: DomaineActivite;

  @Column({ name: 'domaine_activite_id', nullable: true })
  domaineActiviteId?: number;
}
