import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { ApiBearerAuth, ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { MedicationResponseDto } from './responses/medication.response.dto';

@ApiBearerAuth()
@ApiTags('Medications')
@Auth()
@Controller('medications')
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all medications for logged user' })
  @ApiResponse({ status: 200, type: [MedicationResponseDto] })
  findAll(@GetUser() user: User): Promise<MedicationResponseDto[]> {
    return this.medicationsService.findAll(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get medication by id' })
  @ApiResponse({ status: 200, type: MedicationResponseDto })
  @ApiResponse({ status: 404, description: 'Medication not found' })
    findOne(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<MedicationResponseDto> {
    return this.medicationsService.findOne(id, user);
  }

  @Post()
  @ApiOperation({ summary: 'Create a medication' })
  @ApiResponse({ status: 201, type: MedicationResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  create(
    @Body() createMedicationDto: CreateMedicationDto,
    @GetUser() user: User
  ): Promise<MedicationResponseDto> {
    return this.medicationsService.create(createMedicationDto, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a medication' })
  @ApiResponse({ status: 200, type: MedicationResponseDto })
  @ApiResponse({ status: 404, description: 'Medication not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMedicationDto: UpdateMedicationDto,
    @GetUser() user: User
  ): Promise<MedicationResponseDto> {
    return this.medicationsService.update(id, updateMedicationDto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a medication' })
  @ApiResponse({ status: 200, description: 'Medication deleted' })
  @ApiResponse({ status: 404, description: 'Medication not found' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<{ message: string }> {
    return this.medicationsService.remove(id, user);
  }
}
