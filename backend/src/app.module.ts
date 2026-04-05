import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MedicationsModule } from './medications/medications.module';
import { MedicationLogsModule } from './medication-logs/medication-logs.module';
import { SchedulesModule } from './schedules/schedules.module';
import { HealthMetricsModule } from './health-metrics/health-metrics.module';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, //  solo dev
      }),
    }),

    MedicationsModule,
    MedicationLogsModule,
    SchedulesModule,
    HealthMetricsModule,
    AuthModule,
    SeedModule,
  ],
})
export class AppModule {}
