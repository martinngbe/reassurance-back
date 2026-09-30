import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('domaines_activite')
export class DomaineActivite extends BaseEntity {
  @Column({ unique: true })
  code!: string;

  @Column()
  libelle!: string;
}
