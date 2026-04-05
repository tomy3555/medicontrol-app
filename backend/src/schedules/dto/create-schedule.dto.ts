import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsInt, IsPositive, IsString, Matches } from 'class-validator';
import { WeekDay } from 'src/types/weekDay.enum';



export class CreateScheduleDto {

  @ApiProperty({
    example: 1,
    description: 'ID of the medication associated with this schedule'
  })
  @IsInt()
  @IsPositive()
  medicationId!: number;

  @ApiProperty({
    example: '08:00',
    description: 'Time of the day when the medication should be taken (HH:mm)'
  })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
  message: 'time must be in HH:mm format',
})
  time!: string;

  @ApiProperty({
    example: ['mon', 'wed', 'fri'],
    description: 'Days of the week when the medication should be taken',
    enum: WeekDay,
    isArray: true
  })
  @IsArray()
  @IsEnum(WeekDay, { each: true }) 
  days!: WeekDay[];
}
