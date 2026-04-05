import { useMemo } from "react";
import type { Schedule } from "@/schedule/interfaces/schedules.interface";
import type { MedicationLog } from "@/medLogs/interfaces/medicationLog.interface";
import { getTodayWeekDay } from "@/utils/getTodayWeekDay.util";
import { formatLogDate } from "@/utils/fromatLogDate.util";

interface Props {
  schedules: Schedule[];
  logs: MedicationLog[];
}

export const useTodayMedications = ({ schedules = [], logs = [] }: Props) => {
  const todayMeds = useMemo(() => {
    if (!schedules.length) return [];

    const today = getTodayWeekDay();
    const now = new Date();

    return schedules
      .filter((s) => s.days.includes(today))
      .map((schedule) => {
        const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);
        const todayStr = formatLogDate(todayDate);

        const hasLogToday = logs.some(
          (log) => log.scheduleId === schedule.id && log.logDate === todayStr
        );

        const [hours, minutes] = schedule.time.split(":").map(Number);
        const scheduleTime = new Date(todayDate);
        scheduleTime.setHours(hours, minutes, 0, 0);

        let status: "taken" | "upcoming" | "missed";
        if (hasLogToday) status = "taken";
        else if (scheduleTime > now) status = "upcoming";
        else status = "missed";

        return {
          id: schedule.id,
          name: schedule.medicationName ?? "Unknown medication",
          dosage: schedule.medicationDosage ?? "-",
          time: schedule.time,
          status,
        };
      })
      .sort((a, b) => a.time.localeCompare(b.time));
  }, [schedules, logs]);

  return { todayMeds };
};
