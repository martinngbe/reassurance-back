import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Acteur } from 'src/acteurs/entities/acteur.entity';
import Decimal from 'decimal.js';

@Entity('cession_legale')
@Unique(['isFac','acteurId'])
export class CessionLegale extends BaseEntity {
  @Column()
  taux: Decimal= new Decimal(0);

  @Column({name:'is_fac' , default: false})
  isFac!:boolean;

  @ManyToOne(() => Acteur, (acteur) => acteur.cessionLegales , {eager:false})
  @JoinColumn({ name: 'cession_legale_id' })
  acteur!: Acteur;
  @Column({ name: 'branche_id' })
  acteurId!: number;

}
