import { User } from 'src/auth/entities/user.entity';
import { MetricType } from 'src/types/metrics.enum';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';


@Entity('health_metrics')
export class HealthMetric {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'enum',
    enum: MetricType,
  })
  type!: MetricType;

  @Column('float')
  value!: number; // systolic, glucose, temp

  @Column('float', { nullable: true })
  value2?: number; // diastolic (solo para pressure)

  @Column()
  unit!: string;

  @Column({ type: 'date' })
  date!: string;

  @Column({ type: 'time' })
  time!: string;

  @Column({ nullable: true })
  notes?: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.healthMetrics)
  user!: User;
}