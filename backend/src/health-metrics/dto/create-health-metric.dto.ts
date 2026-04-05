import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsPositive, IsString, Validate } from 'class-validator';
import { MetricType } from 'src/types/metrics.enum';
import { IsValue2Required } from '../decorators/value2-required.decorator';

export class CreateHealthMetricDto {

  @ApiProperty({
    enum: MetricType,
    example: 'blood_pressure',
    description: 'Type of health metric (e.g., blood pressure, weight, glucose)'
  })
  @IsEnum(MetricType)
  type!: MetricType;

  @ApiProperty({
    example: 120,
    description: 'Primary value of the metric (e.g., systolic pressure, weight)'
  })
  @IsNumber()
  @IsPositive()
  value!: number;

  @ApiPropertyOptional({
    example: 80,
    description: 'Secondary value (e.g., diastolic pressure in blood pressure)'
  })
  @IsNumber()
  @Validate(IsValue2Required)
  @IsPositive()
  value2?: number;

  @ApiProperty({
    example: 'mmHg',
    description: 'Unit of measurement (e.g., mmHg, kg, mg/dL)'
  })
  @IsString()
  unit!: string;

  @ApiProperty({
    example: '2026-03-31',
    description: 'Date of the measurement (YYYY-MM-DD)'
  })
  @IsString()
  date!: string;

  @ApiProperty({
    example: '14:30',
    description: 'Time of the measurement (HH:mm)'
  })
  @IsString()
  time!: string;

  @ApiPropertyOptional({
    example: 'Measured after breakfast',
    description: 'Optional notes about the measurement'
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
