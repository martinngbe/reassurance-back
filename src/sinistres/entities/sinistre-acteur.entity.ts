// src/entities/SinistreActeur.ts
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { BaseEntity } from "src/common/entities/base.entity";
import { Acteur } from "src/acteurs/entities/acteur.entity";
import { Sinistre } from "./sinistre.entity";

@Entity("sinistre_acteur")
@Unique(["sinistreId", "acteurId"]) // évite les doublons
export class SinistreActeur extends BaseEntity {
 
  @Column({ name: "numero_reference" })
  numeroReference!: string;
  // Relations Sinistre
  @ManyToOne(() => Sinistre, (sinistre) => sinistre.sinistreActeurs, {cascade: true})
  @JoinColumn({ name: "sinistre_id" })
  sinistre!: Sinistre;
  @Column({ name: "sinistre_id" })
  sinistreId!: number;
 // Relations Acteur
  @Column({ name: "acteur_id" })
  acteurId!: number;
  @ManyToOne(() => Acteur, (acteur) => acteur.sinistreActeurs, {cascade: true})
  @JoinColumn({ name: "acteur_id" })
  acteur!: Acteur;

}