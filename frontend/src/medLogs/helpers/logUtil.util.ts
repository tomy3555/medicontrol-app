import { formatLogDate } from "@/utils/fromatLogDate.util";
import type { MedicationLog } from "../interfaces/medicationLog.interface";

export const normalizeLog = (log: MedicationLog): MedicationLog => ({
  ...log,
  takenAt: formatLogDate(log.takenAt),
  logDate: formatLogDate(log.logDate),
});

export const isSameLog = (log: MedicationLog, scheduleId: number, date: string) =>
  log.scheduleId === scheduleId && log.logDate === date;
