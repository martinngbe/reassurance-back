import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('devise')
export class Devise extends BaseEntity {
 
  @Column({ unique: true })
  code!: string;

  @Column()
  libelle!: string;


  @Column({default:1})
  cours: number=1;


  @Column({name:'is_locale', default: false })
  isLocale!: Boolean

  
}
