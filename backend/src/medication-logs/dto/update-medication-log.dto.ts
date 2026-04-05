import { PartialType } from '@nestjs/swagger';
import { CreateMedicationLogDto } from './create-medication-log.dto';

export class UpdateMedicationLogDto extends PartialType(CreateMedicationLogDto) {}
