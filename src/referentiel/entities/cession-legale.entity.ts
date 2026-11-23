import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Acteur } from 'src/acteurs/entities/acteur.entity';
import Decimal from 'decimal.js';
import { DecimalTransformer } from 'src/common/transformers/decimal.transformer';

@Entity('cession_legale')
@Unique(['isFac','acteurId'])
export class CessionLegale extends BaseEntity {
 
  @Column({ name: 'taux',  type: 'decimal', precision: 18, scale: 4, default: 0, transformer: new DecimalTransformer() })
  taux: Decimal= new Decimal(0);

  @Column({name:'is_fac' , default: false})
  isFac!:boolean;

  @ManyToOne(() => Acteur, (acteur) => acteur.cessionLegales , {eager:true})
  @JoinColumn({ name: 'acteur_id' })
  acteur!: Acteur;
  @Column({ name: 'acteur_id' })
  acteurId!: number;

}
