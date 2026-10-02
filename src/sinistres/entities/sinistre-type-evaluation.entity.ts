import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

/** Type d'évaluation d'un sinistre (au comptant, avis, provision...). */
@Entity('sinistre_type_evaluation')
export class SinistreTypeEvaluation extends BaseEntity {
  @Column({ unique: true })
  code!: string;

  @Column()
  libelle!: string;
}
