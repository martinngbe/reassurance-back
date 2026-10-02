// import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
// import { BaseEntity } from '../../common/entities/base.entity';
// import { SinistreStatut } from './sinistre-statut.entity';

// @Entity('sinistre_declarations')
// export class SinistreDeclaration extends BaseEntity {
//   @ManyToOne(() => SinistreStatut)
//   @JoinColumn({ name: 'id_sinistre_statut' })
//   sinistreStatut!: SinistreStatut;

//   @Column({ name: 'id_sinistre_statut' })
//   idSinistreStatut!: number;

//   @Column()
//   numero!: string;

//   @Column()
//   declaration!: string;

//   @Column({ name: 'date_survenance' })
//   dateSurvenance!: Date;
// }
