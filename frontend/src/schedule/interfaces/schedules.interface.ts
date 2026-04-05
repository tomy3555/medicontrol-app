import type { WeekDay } from "@/types/week-day.enum";

export interface Schedule {
  id: number;
  time: string;
  days: WeekDay[];
  medicationId: number;
  medicationName: string;
  medicationDosage: string;
  userId: number;
}