import { Module } from '@nestjs/common';
import { MedicationLogsService } from './medication-logs.service';
import { MedicationLogsController } from './medication-logs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicationLog } from './entities/medication-log.entity';
import { MedicationsModule } from 'src/medications/medications.module';
import { Schedule } from 'src/schedules/entities/schedule.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MedicationLog, Schedule]),
    MedicationsModule,
    AuthModule,
     
  ],
  controllers: [MedicationLogsController],
  providers: [MedicationLogsService],
})
export class MedicationLogsModule {}
