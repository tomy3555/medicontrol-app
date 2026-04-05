import { ApiProperty } from '@nestjs/swagger';
import { WeekDay } from 'src/types/weekDay.enum';

export class ScheduleResponseDto {

  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: '08:00' })
  time!: string;

  @ApiProperty({
    example: ['mon', 'wed', 'fri'],
    enum: WeekDay,
    isArray: true,
  })
  days!: WeekDay[];

  @ApiProperty({ example: 1 })
  medicationId!: number;

  @ApiProperty({ example: 'Aspirin' })
  medicationName!: string;

  @ApiProperty({ example: '500mg' })
  medicationDosage!: string;

  @ApiProperty({ example: 1 })
  userId!: number;
}
