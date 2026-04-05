import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber } from 'class-validator';

export class CreateMedicationLogDto {

  @ApiProperty({
    example: 1,
    description: 'ID of the schedule associated with this medication log'
  })
  @IsNumber()
  scheduleId!: number;

  @ApiProperty({
    example: '2026-03-31T08:00:00.000Z',
    description: 'Date and time when the medication was taken '
  })
  @IsDateString()
  takenAt!: string; 

  @ApiProperty({
    example: '2026-03-31',
    description: 'Date of the log entry (only date, no time)'
  })
  @IsDateString()
  logDate!: string; 

}
