import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Medication } from '../../medications/entities/medication.entity';
import { MedicationLog } from 'src/medication-logs/entities/medication-log.entity';
import { User } from 'src/auth/entities/user.entity';

@Entity('schedules')
export class Schedule {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  time!: string; // "08:00", "14:00"

  @Column('simple-array')
  days!: string[]; 

  @ManyToOne(() => Medication, (medication) => medication.schedules, {
    onDelete: 'CASCADE',
  })
  medication!: Medication;

  @OneToMany(() => MedicationLog, (log) => log.schedule)
    logs!: MedicationLog[];

  @ManyToOne(() => User, (user) => user.schedules)
  user!: User;
}
