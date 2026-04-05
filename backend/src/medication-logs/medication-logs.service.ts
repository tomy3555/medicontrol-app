import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMedicationLogDto } from './dto/create-medication-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicationLog } from './entities/medication-log.entity';
import { Repository } from 'typeorm';
import { Schedule } from 'src/schedules/entities/schedule.entity';
import { User } from 'src/auth/entities/user.entity';
import { MedicationLogResponseDto } from './responses/medicationLog.response.dto';

@Injectable()
export class MedicationLogsService {
  constructor(
    @InjectRepository(MedicationLog)
    private medicationLogRepo: Repository<MedicationLog>,

    @InjectRepository(Schedule)
    private scheduleRepo: Repository<Schedule>,
  ) {}

  private toDto(log: MedicationLog): MedicationLogResponseDto {
    return {
      id: log.id,
      takenAt: log.takenAt.toISOString(),
      logDate: log.logDate,
      scheduleId: log.schedule.id,
      userId: log.user.id,
      medicationName: log.schedule.medication.name,
      medicationDosage: log.schedule.medication.dosage,
    };
  }

  async create(createLogDto: CreateMedicationLogDto, user: User): Promise<MedicationLogResponseDto> {
    const { scheduleId, takenAt, logDate } = createLogDto;

    // Traer schedule con la medicación
    const schedule = await this.scheduleRepo.findOne({
      where: { id: scheduleId, user: { id: user.id } },
      relations: ['medication', 'user'],
    });

    if (!schedule) {
      throw new NotFoundException('Schedule not found');
    }

    // Evitar duplicados
    const existingLog = await this.medicationLogRepo.findOne({
      where: {
        schedule: { id: scheduleId },
        logDate,
        user: { id: user.id },
      },
      relations: ['schedule', 'schedule.medication', 'user'],
    });

    if (existingLog) return this.toDto(existingLog);

    // Crear nuevo log
    const log = this.medicationLogRepo.create({
      schedule,
      user,
      takenAt: new Date(takenAt),
      logDate,
    });

    const saved = await this.medicationLogRepo.save(log);

    // Traerlo completo con relaciones
    const fullLog = await this.medicationLogRepo.findOne({
      where: { id: saved.id },
      relations: ['schedule', 'schedule.medication', 'user'],
    });

    return this.toDto(fullLog!);
  }

  async findAll(user: User): Promise<MedicationLogResponseDto[]> {
    const logs = await this.medicationLogRepo.find({
      where: {
        schedule: { user: { id: user.id } },
      },
      relations: ['schedule', 'schedule.medication', 'user'],
    });

    return logs.map(log => this.toDto(log));
  }

  async findOne(id: number, user: User): Promise<MedicationLogResponseDto> {
    const log = await this.medicationLogRepo.findOne({
      where: { id, schedule: { user: { id: user.id } } },
      relations: ['schedule', 'schedule.medication', 'user'],
    });

    if (!log) throw new NotFoundException(`Log with id ${id} not found`);

    return this.toDto(log);
  }

  async remove(id: number, user: User) {
    const result = await this.medicationLogRepo.delete({
      id,
      user: { id: user.id },
    });

    if (result.affected === 0) throw new NotFoundException(`Log with id ${id} not found`);

    return { message: 'Log deleted successfully' };
  }
}
