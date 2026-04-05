import { User } from 'src/auth/entities/user.entity';
import { Schedule } from 'src/schedules/entities/schedule.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity('medications')
export class Medication {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    dosage!: string;


    @Column({ nullable: true })
    active?: 'active' | 'paused' | 'completed';

    @Column({ nullable: true })
    notes?: string;

    @OneToMany(() => Schedule, (schedule) => schedule.medication)
    schedules!: Schedule[];

    @ManyToOne(() => User, (user) => user.medications)
    user!: User;
}
