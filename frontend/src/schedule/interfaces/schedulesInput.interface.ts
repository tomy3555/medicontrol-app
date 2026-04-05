import type { WeekDay } from "@/types/week-day.enum";

export interface CreateScheduleInput {
  medicationId?: number;
  name?: string;
  dosage?: string;
  time: string;
  days: WeekDay[];
}