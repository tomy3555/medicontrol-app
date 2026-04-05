import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateMedicationDto {

  @ApiProperty({
    example: 'Paracetamol',
    description: 'Name of the medication'
  })
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    example: '500mg',
    description: 'Dosage of the medication'
  })
  @IsString()
  @IsNotEmpty()
  dosage!: string;


  @ApiPropertyOptional({
    example: 'active',
    description: 'Current status of the medication',
    enum: ['active', 'paused', 'completed']
  })
  @IsOptional()
  @IsString()
  active?: 'active' | 'paused' | 'completed';

  @ApiPropertyOptional({
    example: 'Take after meals',
    description: 'Additional notes about the medication'
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
