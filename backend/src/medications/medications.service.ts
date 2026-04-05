import { Injectable } from '@nestjs/common';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { Repository } from 'typeorm';
import { Medication } from './entities/medication.entity';
import { InjectRepository } from '@nestjs/typeorm';

import { NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/entities/user.entity';
import { MedicationResponseDto } from './responses/medication.response.dto';


@Injectable()
export class MedicationsService {

  constructor(
    @InjectRepository(Medication)
    private medicationRepo: Repository<Medication>
  ) {}

  async create(createMedicationDto: CreateMedicationDto, user: User
  ): Promise<MedicationResponseDto> {

    const medication = this.medicationRepo.create({
      ...createMedicationDto,
      user,
    });

    const saved = await this.medicationRepo.save(medication);

    return {
      id: saved.id,
      name: saved.name,
      dosage: saved.dosage,
      active: saved.active,
      notes: saved.notes,
    };
  }

  async findAll(user: User): Promise<MedicationResponseDto[]> {
    const meds = await this.medicationRepo.find({
      where: { user: { id: user.id } },
    });

    return meds.map(m => ({
      id: m.id,
      name: m.name,
      dosage: m.dosage,
      notes: m.notes,
      userId: m.user?.id,
    }));
  }


  async findOne(id: number, user: User): Promise<MedicationResponseDto> {
    const med = await this.medicationRepo.findOne({
      where: { id, user: { id: user.id } },
    });

    if (!med) {
      throw new NotFoundException(`Medication with id ${id} not found`);
    }

    return {
      id: med.id,
      name: med.name,
      dosage: med.dosage,
      notes: med.notes,
    };
  }

  async update(id: number, updateMedicationDto: UpdateMedicationDto, user: User) {
    const medication = await this.findOne(id, user);

    const updatedMedication = {
      ...medication,
      ...updateMedicationDto,
    };

    return this.medicationRepo.save(updatedMedication);
  }

  async remove(
    id: number,
    user: User
  ): Promise<{ message: string }> {

    const medication = await this.medicationRepo.findOne({
      where: { id, user: { id: user.id } },
    });

    if (!medication) {
      throw new NotFoundException(`Medication with id ${id} not found`);
    }

    await this.medicationRepo.remove(medication);

    return { message: 'Medication deleted successfully' };
  }

}

