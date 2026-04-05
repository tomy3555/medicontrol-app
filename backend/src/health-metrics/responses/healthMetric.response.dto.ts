import { ApiProperty } from '@nestjs/swagger';
import { MetricType } from 'src/types/metrics.enum';

export class HealthMetricResponseDto {

  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ enum: MetricType })
  type!: MetricType;

  @ApiProperty({ example: 72 })
  value!: number;

  @ApiProperty({ example: 120, required: false })
  value2?: number;

  @ApiProperty({ example: 'bpm' })
  unit!: string;

  @ApiProperty({ example: '2026-03-31' })
  date!: string;

  @ApiProperty({ example: '14:30' })
  time!: string;

  @ApiProperty({ example: 'Feeling good today', required: false })
  notes?: string;

  @ApiProperty({ example: 1 })
  userId?: number;
}
