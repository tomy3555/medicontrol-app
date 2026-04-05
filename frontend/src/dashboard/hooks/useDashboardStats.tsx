import { useMemo } from "react";
import type { MedicationLog } from "@/medLogs/interfaces/medicationLog.interface";
import type { Schedule } from "@/schedule/interfaces/schedules.interface";
import { formatLogDate } from "@/utils/fromatLogDate.util";
import { getTodayWeekDay } from "@/utils/getTodayWeekDay.util";
import { weekDayMap } from "../helpers/weekDayMap.util";

interface Props {
  schedules: Schedule[];
  logs: MedicationLog[];
}

export const useDashboardStats = ({ schedules = [], logs = [] }: Props) => {
  const stats = useMemo(() => {

    const now = new Date();
    const today = new Date();
    today.setHours(0, 0, 0, 0); // normalizamos a medianoche
    const todayStr = formatLogDate(today); 
    const todayWeekDay = getTodayWeekDay(); // nombre del día actual


    const todaySchedules = schedules.filter((s) => s.days?.includes(todayWeekDay));

    const todayLogsRaw = logs.filter((log) => log.logDate === todayStr);

    // eliminamos duplicados por scheduleId + logDate
    const todayLogs = Array.from(
      new Map(todayLogsRaw.map((log) => [`${log.scheduleId}-${log.logDate}`, log])).values()
    );


    const expected = todaySchedules.length; 
    const taken = new Set(todayLogs.map((log) => log.scheduleId)).size; 
    const remaining = Math.max(expected - taken, 0); 
    const completion = expected === 0 ? 0 : Math.round((taken / expected) * 100); // % de cumplimiento


    const nextDose = todaySchedules
    .map((s: Schedule) => ({
      ...s,
      date: new Date(`${today.toDateString()} ${s.time}`),
    }))
    .filter((s) => s.date > now)
    .sort((a, b) => a.date.getTime() - b.date.getTime())[0];

    const nextDoseWithMed = nextDose
    ? {
        ...nextDose,
        name: nextDose.medicationName,
        dosage: nextDose.medicationDosage,
      }
    : null;




    const getStreak = (): number => {
      if (!logs.length || !schedules.length) return 0;

      let streak = 0;

      // chequeamos los últimos 30 días
      for (let i = 0; i < 30; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(today.getDate() - i);
        const formattedDate = formatLogDate(checkDate);

        const dayIndex = checkDate.getDay();
        const currentDay = weekDayMap[dayIndex === 0 ? 6 : dayIndex - 1];

        const daySchedules = schedules.filter((s) => s.days.includes(currentDay));
        if (!daySchedules.length) continue; // no hay schedule ese día

        const dayLogs = logs.filter((log) => log.logDate === formattedDate);
        const takenUnique = new Set(dayLogs.map((l) => l.scheduleId)).size;

        if (takenUnique === daySchedules.length) streak++;
        else break; // streak roto
      }

      return streak;
    };


    return {
      expected,
      taken,
      remaining,
      todaySchedules,
      todayLogs,
      streak: getStreak(),
      completion,
      nextDoseWithMed,
    };
  }, [schedules, logs]);

  return stats;
};
