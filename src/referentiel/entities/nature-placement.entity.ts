import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

/** Légale, Conventionnelle, Facultative... */
@Entity('nature_placement')
export class NaturePlacement extends BaseEntity {
  @Column({ unique: true })
  code!: string;

  @Column()
  libelle!: string;
}
