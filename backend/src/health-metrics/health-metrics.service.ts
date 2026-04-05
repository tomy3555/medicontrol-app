import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { HealthMetric } from './entities/health-metric.entity';
import { CreateHealthMetricDto } from './dto/create-health-metric.dto';
import { UpdateHealthMetricDto } from './dto/update-health-metric.dto';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class HealthMetricsService {

  constructor(
    @InjectRepository(HealthMetric)
    private healthMetricRepo: Repository<HealthMetric>,
  ) {}

  async create(createDto: CreateHealthMetricDto, user: User) {
    const metric = this.healthMetricRepo.create({
      ...createDto,
      user, 
    });

    return this.healthMetricRepo.save(metric);
  }

  findAll(user: User) {
    return this.healthMetricRepo.find({
      where: {
        user: { id: user.id }, 
      },
      order: {
        date: 'DESC',
        time: 'DESC',
      },
    });
  }

  async findOne(id: number, user: User) {
    const metric = await this.healthMetricRepo.findOne({
      where: {
        id,
        user: { id: user.id }, 
      },
    });

    if (!metric) {
      throw new NotFoundException('Metric not found');
    }

    return metric;
  }

  async update(id: number, updateDto: UpdateHealthMetricDto, user: User) {
    const metric = await this.findOne(id, user);

    const updated = {
      ...metric,
      ...updateDto,
    };

    return this.healthMetricRepo.save(updated);
  }

  async remove(id: number, user: User) {
    const metric = await this.findOne(id, user);

    await this.healthMetricRepo.remove(metric);

    return { message: 'Deleted successfully' };
  }
}

