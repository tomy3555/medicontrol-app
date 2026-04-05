import { useEffect, useState } from "react";
import type { MedicationLog } from "@/medLogs/interfaces/medicationLog.interface";
import type { Schedule } from "@/schedule/interfaces/schedules.interface";

import { createMedicationLog, deleteMedicationLog, getMedicationLogs } from "@/medLogs/services/medication-logs.service";

import { formatLogDate } from "@/utils/fromatLogDate.util";
import { isWithinLastDays } from "../helpers/isWithinLastDays.util";
import { isSameLog } from "../helpers/logUtil.util";

export const useMedicationLogs = () => {
  const [logs, setLogs] = useState<MedicationLog[]>([]);

  const normalizeLog = (log: any): MedicationLog => ({
    id: log.id,
    scheduleId: log.scheduleId,
    logDate: formatLogDate(log.logDate),
    takenAt: formatLogDate(log.takenAt),
    medicationName: log.medicationName ?? log.medication?.name ?? "",
    medicationDosage: log.medicationDosage ?? log.medication?.dosage ?? "",
  });

  const fetchLogs = async () => {
    const fetchedLogs = await getMedicationLogs();
    const normalizedLogs = fetchedLogs
      .map(normalizeLog)
      // evitar duplicados
      .filter((log, i, arr) =>
        arr.findIndex(l => l.scheduleId === log.scheduleId && l.logDate === log.logDate) === i
      )
      // últimos 30 días
      .filter(log => isWithinLastDays(log.logDate, 30));


    setLogs(normalizedLogs);

    console.log('Fetched logs: ', normalizedLogs)
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const isTaken = (scheduleId: number, date: string) =>
    logs.some(log => isSameLog(log, scheduleId, date));

  const markAsTaken = async (scheduleId: number, date: string) => {
    if (!date || isTaken(scheduleId, date)) return;

    const newLog = await createMedicationLog({
      scheduleId,
      takenAt: date,
      logDate: date,
    });

    const normalized = normalizeLog(newLog);
    setLogs(prev => [...prev, normalized]);
    return normalized;
  };

  const unmarkAsTaken = async (scheduleId: number, date: string) => {
    const toDelete = logs.filter(log => isSameLog(log, scheduleId, date));
    for (const log of toDelete) await deleteMedicationLog(log.id);

    setLogs(prev => prev.filter(log => !isSameLog(log, scheduleId, date)));
  };

  const handleToggleTaken = async (schedule: Schedule, date: string) =>
    isTaken(schedule.id, date)
      ? unmarkAsTaken(schedule.id, date)
      : markAsTaken(schedule.id, date);

  return { logs, markAsTaken, unmarkAsTaken, isTaken, handleToggleTaken };
};
