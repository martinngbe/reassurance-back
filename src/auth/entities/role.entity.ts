import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
} from 'typeorm';
import { Utilisateur } from './utilisateur.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity('role')
export class Role extends BaseEntity {
 
  @Column({ unique: true })
  code!: string; // ADMIN, GESTIONNAIRE, COURTIER, REASSUREUR, CONSULTANT

  @Column()
  label!: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToMany(() => Utilisateur, (user) => user.roles)
  utilisateurs!: Utilisateur[];
}