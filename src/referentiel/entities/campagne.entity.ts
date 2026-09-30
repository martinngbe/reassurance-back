import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('campagnes')
export class Campagne extends BaseEntity {
  @Column({ unique: true })
  code!: string;

  @Column()
  libelle!: string;

  @Column({ name: 'date_debut', type: 'date' })
  dateDebut!: Date;

  @Column({ name: 'date_fin', type: 'date' })
  dateFin!: Date;

  
  @Column({ name: 'is_actif', default: false })
  isActif: boolean=false;

}
