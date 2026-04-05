import { Module } from '@nestjs/common';


import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { HealthMetric } from 'src/health-metrics/entities/health-metric.entity';
import { Medication } from 'src/medications/entities/medication.entity';
import { Schedule } from 'src/schedules/entities/schedule.entity';
import { MedicationLog } from 'src/medication-logs/entities/medication-log.entity';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    TypeOrmModule.forFeature([User, Medication, Schedule, HealthMetric, MedicationLog]),
  ],
})
export class SeedModule {}
