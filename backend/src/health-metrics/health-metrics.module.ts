import { Module } from '@nestjs/common';
import { HealthMetricsService } from './health-metrics.service';
import { HealthMetricsController } from './health-metrics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthMetric } from './entities/health-metric.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [HealthMetricsController],
  providers: [HealthMetricsService],
  imports: [
    TypeOrmModule.forFeature([HealthMetric]),
    AuthModule
  ]
})
export class HealthMetricsModule {}
