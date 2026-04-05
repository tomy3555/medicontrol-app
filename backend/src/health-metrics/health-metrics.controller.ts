import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { HealthMetricsService } from './health-metrics.service';
import { CreateHealthMetricDto } from './dto/create-health-metric.dto';
import { UpdateHealthMetricDto } from './dto/update-health-metric.dto';

import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

import { HealthMetricResponseDto } from './responses/healthMetric.response.dto';

@ApiTags('Health Metrics')
@ApiBearerAuth()
@Auth()
@Controller('health-metrics')
export class HealthMetricsController {
  constructor(private readonly healthMetricsService: HealthMetricsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new health metric' })
  @ApiResponse({
    status: 201,
    description: 'Health metric created successfully',
    type: HealthMetricResponseDto,
  })
  create(
    @Body() dto: CreateHealthMetricDto,
    @GetUser() user: User,
  ): Promise<HealthMetricResponseDto> {
    return this.healthMetricsService.create(dto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all health metrics for the logged user' })
  @ApiResponse({
    status: 200,
    description: 'List of health metrics',
    type: [HealthMetricResponseDto],
  })
  findAll(
    @GetUser() user: User,
  ): Promise<HealthMetricResponseDto[]> {
    return this.healthMetricsService.findAll(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific health metric by ID' })
  @ApiResponse({
    status: 200,
    description: 'Health metric found',
    type: HealthMetricResponseDto,
  })
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<HealthMetricResponseDto> {
    return this.healthMetricsService.findOne(id, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a health metric' })
  @ApiResponse({
    status: 200,
    description: 'Health metric updated',
    type: HealthMetricResponseDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateHealthMetricDto,
    @GetUser() user: User,
  ): Promise<HealthMetricResponseDto> {
    return this.healthMetricsService.update(id, dto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a health metric' })
  @ApiResponse({
    status: 200,
    description: 'Health metric deleted',
  })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<{ message: string }> {
    return this.healthMetricsService.remove(id, user);
  }
}
