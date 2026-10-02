import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('compte_type')
export class CompteType extends BaseEntity {
  @Column({ unique: true })
  code!: string;

  @Column()
  libelle!: string;
}
