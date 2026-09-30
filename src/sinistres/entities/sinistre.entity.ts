import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

/** Sinistre au sens large (racine du module sinistres). */
@Entity('sinistres')
export class Sinistre extends BaseEntity {
  @Column({ nullable: true })
  reference?: string;
}
