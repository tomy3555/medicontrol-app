import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MedicationResponseDto {

  @ApiProperty({ example: 1, description: 'ID of the medication' })
  id!: number;

  @ApiProperty({ example: 'Aspirin', description: 'Name of the medication' })
  name!: string;

  @ApiProperty({ example: '500mg', description: 'Dosage of the medication' })
  dosage!: string;

  @ApiPropertyOptional({
    enum: ['active', 'paused', 'completed'],
    example: 'active',
    description: 'Current status of the medication',
  })
  active?: 'active' | 'paused' | 'completed';

  @ApiPropertyOptional({ example: 'Take after meals', description: 'Optional notes about the medication' })
  notes?: string;

}
