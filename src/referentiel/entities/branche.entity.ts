import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { SousBranche } from './sous-branche.entity';

@Entity('branche')
export class Branche extends BaseEntity {
  @Column({ unique: true })
  code!: string;

  @Column()
  libelle!: string;

  @Column({name:"is_retro_conventionnelle" , default:false})
  isRetroConventionnelle!: boolean;

  @OneToMany(() => SousBranche, (sousBranche) => sousBranche.branche)
  sousBranches!: SousBranche[];
}
