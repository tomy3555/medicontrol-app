import { User } from "src/auth/entities/user.entity";
import { Schedule } from "src/schedules/entities/schedule.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('medication_logs')
@Unique(['schedule', 'logDate', 'user'])
export class MedicationLog {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  takenAt!: Date;

  @ManyToOne(() => Schedule, { onDelete: "CASCADE" })
  schedule!: Schedule;

  @ManyToOne(() => User, (user) => user.logs)
  user!: User;

  @Column({ type: 'date', nullable: true })
  logDate!: string; 

}