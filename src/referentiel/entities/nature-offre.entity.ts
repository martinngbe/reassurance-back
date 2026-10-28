import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

/** Légale, Conventionnelle, Facultative... */
@Entity('nature_offre')
export class NatureOffre extends BaseEntity {
  @Column({ unique: true })
  code!: string;

  @Column()
  libelle!: string;

  @Column({name:'is_facultative', default: false})
  isFacultative!: boolean;

  @Column({name:'is_fac_obligatoire', default: false})
  isFacObligatoire!: boolean;

  @Column({name:'is_proportionnelle', default: false})
  isProportionnelle!: boolean;

  @Column({name:'is_edp', default: false})
  isEdp!: boolean;

   @Column({name:'is_quote_part', default: false})
  isQuotePart!: boolean;

  @Column({name:'is_xs', default: false})
  isXs!: boolean;
  
}
