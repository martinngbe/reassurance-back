import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { SousBranche } from './sous-branche.entity';

@Entity('branches')
export class Branche extends BaseEntity {
  @Column({ unique: true })
  code!: string;

  @Column()
  libelle!: string;

  @OneToMany(() => SousBranche, (sousBranche) => sousBranche.branche)
  sousBranches: SousBranche[]=[];
}
