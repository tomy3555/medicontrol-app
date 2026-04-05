import { ApiProperty } from '@nestjs/swagger';

export class MedicationLogResponseDto {

  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 3, description: 'ID del schedule asociado' })
  scheduleId!: number;

  @ApiProperty({ example: '2026-03-31T00:00:00.000Z ', description: 'Fecha y hora cuando se tomó la medicación' })
  takenAt!: string;

  @ApiProperty({ example: 1, description: 'ID del usuario que registró el log' })
  userId!: number;

  @ApiProperty({ example: '2026-03-31 ', description: 'Fecha y hora cuando se tomó la medicación' })
  logDate!:string;

  @ApiProperty({ example: 'Aspirin ', description: 'Nombre del medicamento' })
  medicationName!: string;

  @ApiProperty({ example: '500mg ', description: 'Medida del medicamento a tomar' })
  medicationDosage!: string;
}
