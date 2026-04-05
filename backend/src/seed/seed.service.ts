// src/seed/seed.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { User } from 'src/auth/entities/user.entity';
import { Schedule } from 'src/schedules/entities/schedule.entity';
import { HealthMetric } from 'src/health-metrics/entities/health-metric.entity';
import { MedicationLog } from 'src/medication-logs/entities/medication-log.entity';
import { Medication } from 'src/medications/entities/medication.entity';
import { initialData } from './data/seed-data';

import * as bcrypt from 'bcrypt';


@Injectable()
export class SeedService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Medication)
    private readonly medicationRepository: Repository<Medication>,

    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,

    @InjectRepository(HealthMetric)
    private readonly healthMetricRepository: Repository<HealthMetric>,

    @InjectRepository(MedicationLog)
    private readonly medicationLogRepository: Repository<MedicationLog>,

    private readonly dataSource: DataSource
  ) {}

  async runSeed() {
    await this.deleteTables();

    const users = await this.insertUsers();

    for (const user of users) {
      const medications = await this.insertMedications(user);
      const schedules = await this.insertSchedules(user, medications);
      // await this.insertMedicationLogs(user, schedules);
      await this.insertHealthMetrics(user);
    }

    return 'SEED EXECUTED';
  }

  private async deleteTables() {
    await this.dataSource.query('SET FOREIGN_KEY_CHECKS = 0');
    await this.medicationLogRepository.clear();
    await this.scheduleRepository.clear();
    await this.medicationRepository.clear();
    await this.healthMetricRepository.clear();
    await this.userRepository.clear();
    await this.dataSource.query('SET FOREIGN_KEY_CHECKS = 1');
  }

  private async insertUsers(): Promise<User[]> {
    const users: User[] = initialData.users.map(u => this.userRepository.create({
      ...u, 
      password: bcrypt.hashSync(u.password, 10)
    }));
    return await this.userRepository.save(users);
  }

  private async insertMedications(user: User): Promise<Medication[]> {
  const seedUser = initialData.users.find(u => u.email === user.email);
  if (!seedUser) throw new Error(`No seed data found for user ${user.email}`);

  const meds = seedUser.medications.map(m =>
    this.medicationRepository.create({ ...m, user })
  );
  return await this.medicationRepository.save(meds);
}



private async insertSchedules(user: User, medications: Medication[]): Promise<Schedule[]> {
  const seedUser = initialData.users.find(u => u.email === user.email);
  if (!seedUser) throw new Error(`No seed data found for user ${user.email}`);

  const schedulesToInsert: Schedule[] = [];

  seedUser.schedules.forEach(s => {
    const med = medications[s.medicationIndex];
    schedulesToInsert.push(
      this.scheduleRepository.create({
        medication: med,
        time: s.time,
        days: s.days,
        user,
      })
    );
  });

  return await this.scheduleRepository.save(schedulesToInsert);
}


  // private async insertMedicationLogs(user: User, schedules: Schedule[]) {
  //   const seedUser = initialData.users.find(u => u.email === user.email);
  //   if (!seedUser || !seedUser.medicationLogs) return;

  //   const logsMap = new Map<string, MedicationLog>();

  //   seedUser.medicationLogs.forEach(medLog => {
  //     const schedule = schedules[medLog.scheduleIndex];
  //     if (!schedule) return;

  //     const key = `${schedule.id}-${medLog.logDate}-${user.id}`;

  //     if (logsMap.has(key)) return; 


  //     const log = this.medicationLogRepository.create({
  //       schedule,
  //       user,
  //       logDate: medLog.logDate,
  //       takenAt: new Date(`${medLog.logDate}T08:00:00`),
  //     });

  //     logsMap.set(key, log);
  //   });

  //   await this.medicationLogRepository
  //     .createQueryBuilder()
  //     .insert()
  //     .values(Array.from(logsMap.values()))
  //     .orIgnore()
  //     .execute();
  // }



  private async insertHealthMetrics(user: User) {
    const seedUser = initialData.users.find(u => u.email === user.email);
    if (!seedUser) throw new Error(`No seed data found for user ${user.email}`);
    const metrics = seedUser.healthMetrics.map(m => this.healthMetricRepository.create({ ...m, user }));
    await this.healthMetricRepository.save(metrics);
  }
}
