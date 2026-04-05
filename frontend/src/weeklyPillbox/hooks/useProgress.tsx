import type { MedicationLog } from "@/medLogs/interfaces/medicationLog.interface";
import type { Schedule } from "@/schedule/interfaces/schedules.interface";

interface Props {
  logs: MedicationLog[];
}

export const useProgress = ({  logs }: Props) => {
  const getDayProgress = (daySchedules: Schedule[], selectedDate: string) => {
    const total = daySchedules.length;

    const taken = new Set(
      logs
        .filter(log => log.logDate === selectedDate)
        .map(log => log.scheduleId)
    ).size;

    return { total, taken };
  };

  return { getDayProgress };
};
