import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('branche_retro_cession')
export class BrancheRetroCession extends BaseEntity {
  @Column({ unique: true })
  code!: string;

  @Column()
  libelle!: string;


  @Column({name:'is_iard'})
  isIard!: boolean;

}
