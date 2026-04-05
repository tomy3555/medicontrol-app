import type { Schedule } from "../interfaces/schedules.interface";

export const groupSchedulesByTime = (schedules: Schedule[]) => {
  const grouped: Record<string, Schedule[]> = {};

  for (const schedule of schedules) {
    if (!grouped[schedule.time]) {
      grouped[schedule.time] = [];
    }
    grouped[schedule.time].push(schedule);
  }

  return grouped;
};
