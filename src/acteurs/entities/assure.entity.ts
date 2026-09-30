import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('assures')
export class Assure extends BaseEntity {
  @Column()
  sigle!: string;

  @Column({ name: 'raison_sociale' })
  raisonSociale!: string;

  @Column()
  email!: string;
}
