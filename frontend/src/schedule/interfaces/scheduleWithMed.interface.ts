import type { WeekDay } from "@/types/week-day.enum";

export interface ScheduleWithMedication {
  id: number;
  time: string;
  days: WeekDay[];
  medicationId: number;

  medication: {
    name: string;
    dosage: string;
  };
}
