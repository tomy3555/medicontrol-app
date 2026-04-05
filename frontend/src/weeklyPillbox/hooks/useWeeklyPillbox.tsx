import { useState } from "react";
import { useMedications } from "@/medication/hooks/useMedications";
import type { Medication } from "@/medication/interfaces/medication.interface";
import { createSchedule } from "@/schedule/services/schedule.service";
import type { Schedule } from "@/schedule/interfaces/schedules.interface";
import type { WeekDay } from "@/types/week-day.enum";

export interface ScheduleWithMedication {
  schedule: Schedule;
  medication: Medication;
}

export const usePillbox = () => {
  const { medications, addMedication } = useMedications();
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const assignMedicationToSchedule = async ({
    medicationId,
    time,
    days,
  }: {
    medicationId: number;
    time: string;
    days: WeekDay[];
  }) => {
    const newSchedule = await createSchedule({
      medicationId,
      time,
      days,
    });

    setSchedules((prev) => [...prev, newSchedule]);
  };

  const createMedicationAndAssign = async ({
    medication,
    time,
    days,
  }: {
    medication: Partial<Medication>;
    time: string;
    days: WeekDay[];
  }) => {
    const newMed = await addMedication(medication);

    await assignMedicationToSchedule({
      medicationId: newMed.id,
      time,
      days,
    });
  };


  const getDaySchedules = (day: WeekDay): ScheduleWithMedication[] => {
    return schedules
    .filter((s) => s.days.includes(day))
    .map((s) => {
      const med = medications.find(
        (m) => (m.id) === String(s.medicationId)
      );

      return {
        schedule: s,
        medication: med!, 
      };
    });
  };


  return {
    medications,
    schedules,

    assignMedicationToSchedule,
    createMedicationAndAssign,
    getDaySchedules,
  };
};
