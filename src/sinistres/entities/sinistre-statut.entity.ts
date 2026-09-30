import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('sinistre_statuts')
export class SinistreStatut extends BaseEntity {
  @Column()
  libelle!: string;
}
