import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('sinistre_statut')
export class SinistreStatut extends BaseEntity {
  @Column()
  code!: string;
  @Column()
  libelle!: string;
}
