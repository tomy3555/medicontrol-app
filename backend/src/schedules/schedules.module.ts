import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medication } from 'src/medications/entities/medication.entity';
import { Schedule } from './entities/schedule.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [SchedulesController],
  providers: [SchedulesService],
  imports: [TypeOrmModule.forFeature([Schedule, Medication]),
  AuthModule]
})
export class SchedulesModule {}
