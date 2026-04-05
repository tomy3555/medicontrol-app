import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Medication } from 'src/medications/entities/medication.entity';
import { Repository } from 'typeorm';
import { Schedule } from './entities/schedule.entity';
import { User } from 'src/auth/entities/user.entity';
import { ScheduleResponseDto } from './responses/schedule.response.dto';
import { WeekDay } from 'src/types/weekDay.enum';

@Injectable()
export class SchedulesService {

  constructor(
    @InjectRepository(Medication)
    private medicationRepo: Repository<Medication>,

    @InjectRepository(Schedule)
    private scheduleRepo: Repository<Schedule>,
  ) {}

  // mapper para no repetir
  private mapToResponse(schedule: Schedule): ScheduleResponseDto {
    return {
      id: schedule.id,
      time: schedule.time,
      days: schedule.days.map(d => d as WeekDay),
      medicationId: schedule.medication.id,
      medicationName: schedule.medication.name,
      medicationDosage: schedule.medication.dosage,
      userId: schedule.user.id,
    };
  }

  async create(createScheduleDto: CreateScheduleDto, user: User,
  ): Promise<ScheduleResponseDto> {

    const { medicationId, time, days } = createScheduleDto;

    const medication = await this.medicationRepo.findOne({
      where: {
        id: medicationId,
        user: { id: user.id },
      },
    });

    if (!medication) {
      throw new NotFoundException('Medication not found');
    }

    const schedule = this.scheduleRepo.create({
      time,
      medication,
      days,
      user,
    });

    const saved = await this.scheduleRepo.save(schedule);

    const full = await this.scheduleRepo.findOne({
      where: { id: saved.id },
      relations: ['medication', 'user'],
    });

    return this.mapToResponse(full!);
  }

  async findAll(user: User): Promise<ScheduleResponseDto[]> {
    const schedules = await this.scheduleRepo.find({
      where: {
        user: { id: user.id },
      },
      relations: ['medication', 'user'],
    });

    return schedules.map(s => this.mapToResponse(s));
  }

  async update(id: number, updateDto: UpdateScheduleDto, user: User,
  ): Promise<ScheduleResponseDto> {

    const schedule = await this.scheduleRepo.findOne({
      where: {
        id,
        user: { id: user.id },
      },
      relations: ['medication', 'user'],
    });

    if (!schedule) {
      throw new NotFoundException('Schedule not found');
    }

    const updated = this.scheduleRepo.merge(schedule, updateDto);

    const saved = await this.scheduleRepo.save(updated);

    return this.mapToResponse(saved);
  }


  async remove(id: number, user: User,
  ): Promise<{ message: string }> {

    const schedule = await this.scheduleRepo.findOne({
      where: {
        id,
        user: { id: user.id },
      },
    });

    if (!schedule) {
      throw new NotFoundException('Schedule not found');
    }

    await this.scheduleRepo.remove(schedule);

    return { message: 'Deleted successfully' };
  }
}
