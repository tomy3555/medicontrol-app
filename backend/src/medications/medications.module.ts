import { Module } from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { MedicationsController } from './medications.controller';
import { Medication } from './entities/medication.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [MedicationsController],
  providers: [MedicationsService],
  imports: [TypeOrmModule.forFeature([Medication]),
  AuthModule],
  exports: [TypeOrmModule]
})
export class MedicationsModule {}
