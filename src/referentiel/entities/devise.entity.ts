import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Region } from './region.entity';

@Entity('devise')
export class Devise extends BaseEntity {
 
  @Column({ unique: true })
  code!: string;

  @Column()
  libelle!: string;

  
}
