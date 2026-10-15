import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Colonnes communes à toutes les entités du domaine (alignées sur les
 * diagrammes fournis : id, createdAt, updatedAt).
 */
export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  
  @Column({ name: 'created_by' , nullable: true , default: null})
  createdBy?: number;

  @Column({ name: 'updated_by' , nullable: true, default: null})
  updatedBy?: number;
}
