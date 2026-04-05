import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { MedicationLogsService } from './medication-logs.service';
import { CreateMedicationLogDto } from './dto/create-medication-log.dto';

import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

import { MedicationLogResponseDto } from './responses/medicationLog.response.dto';

@ApiTags('Medication Logs')
@ApiBearerAuth()
@Auth()
@Controller('medication-logs')
export class MedicationLogsController {
  constructor(private readonly medicationLogsService: MedicationLogsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a medication log' })
  @ApiResponse({
    status: 201,
    description: 'Medication log created successfully',
    type: MedicationLogResponseDto,
  })
  create(
    @Body() createMedicationLogDto: CreateMedicationLogDto,
    @GetUser() user: User,
  ): Promise<MedicationLogResponseDto> {
    return this.medicationLogsService.create(createMedicationLogDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all medication logs' })
  @ApiResponse({
    status: 200,
    description: 'List of medication logs',
    type: [MedicationLogResponseDto],
  })
  findAll(
    @GetUser() user: User,
  ): Promise<MedicationLogResponseDto[]> {
    return this.medicationLogsService.findAll(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a medication log by ID' })
  @ApiResponse({
    status: 200,
    description: 'Medication log found',
    type: MedicationLogResponseDto,
  })
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<MedicationLogResponseDto> {
    return this.medicationLogsService.findOne(id, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a medication log' })
  @ApiResponse({
    status: 200,
    description: 'Medication log deleted',
  })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<{ message: string; }> {
    return this.medicationLogsService.remove(id, user);
  }
}
