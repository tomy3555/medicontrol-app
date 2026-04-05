import type { MedicationLog } from "../interfaces/medicationLog.interface";



export const isSameLog = (log: MedicationLog, scheduleId: number, date: string) =>
  log.scheduleId === scheduleId && log.logDate === date;
