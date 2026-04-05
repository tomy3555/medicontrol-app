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

import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

import { ScheduleResponseDto } from './responses/schedule.response.dto';

@ApiBearerAuth()
@ApiTags('Schedules')
@Auth()
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new schedule' })
  @ApiResponse({
    status: 201,
    description: 'Schedule created',
    type: ScheduleResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data',
  })
  create(
    @Body() createScheduleDto: CreateScheduleDto,
    @GetUser() user: User,
  ): Promise<ScheduleResponseDto> {
    return this.schedulesService.create(createScheduleDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all schedules for the logged user' })
  @ApiResponse({
    status: 200,
    description: 'All schedules',
    type: [ScheduleResponseDto],
  })
  findAll(
    @GetUser() user: User,
  ): Promise<ScheduleResponseDto[]> {
    return this.schedulesService.findAll(user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a schedule' })
  @ApiResponse({
    status: 200,
    description: 'Schedule updated',
    type: ScheduleResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Schedule not found',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateScheduleDto: UpdateScheduleDto,
    @GetUser() user: User,
  ): Promise<ScheduleResponseDto> {
    return this.schedulesService.update(id, updateScheduleDto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a schedule' })
  @ApiResponse({
    status: 200,
    description: 'Schedule deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Schedule not found',
  })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<{ message: string }> {
    return this.schedulesService.remove(id, user);
  }
}
