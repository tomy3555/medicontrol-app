import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Medication } from "../../medications/entities/medication.entity";
import { Schedule } from "../../schedules/entities/schedule.entity";
import { MedicationLog } from "../../medication-logs/entities/medication-log.entity";
import { HealthMetric } from "../../health-metrics/entities/health-metric.entity";

@Entity('users')
export class User {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', unique: true }) // el ! es porque tengo "strictPropertyInitialization": false en tsconfig, entonces el ! es para 
  email!: string; // indicar que esta propiedad se inicializará en algún momento

  @Column({ type: 'varchar', select: false })
  password!: string;

  @Column({ type: 'varchar' })
  fullName!: string;

  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  @OneToMany(() => Medication, (med) => med.user)
  medications!: Medication[];

  @OneToMany(() => Schedule, (schedule) => schedule.user)
  schedules!: Schedule[];

  @OneToMany(() => MedicationLog, (log) => log.user)
  logs!: MedicationLog[];

  @OneToMany(() => HealthMetric, (metric) => metric.user)
  healthMetrics!: HealthMetric[];

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
