import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import { Role } from './role.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity('utilisateur')
export class Utilisateur extends BaseEntity{


  @Column({ unique: true })
  email!: string;

  @Column()
  @Exclude()
  password!: string;

  @Column({ name: 'first_name', length: 100 })
  nom!: string;

  @Column({ name: 'last_name', length: 100 })
  prenoms!: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean = true;

  @Column({ name: 'last_login_at', type: 'timestamp', nullable: true })
  lastLoginAt: Date | null = null;

  @Column({ name: 'login_attempts', default: 0 })
  loginAttempts: number = 0;

  @Column({ name: 'locked_until', type: 'timestamp', nullable: true })
  lockedUntil: Date | null = null;

  @Column({ name: 'refresh_token', nullable: true })
  @Exclude()
  refreshToken?: string

  @ManyToMany(() => Role, { eager: true })
  @JoinTable({
    name: 'role_utilisateur',
    joinColumn: { name: 'utilisateur_id' },
    inverseJoinColumn: { name: 'role_id' },
  })
  roles!: Role[];


  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password && !this.password.startsWith('$2b$')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}