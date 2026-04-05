import { api } from "@/app/axios";
import type { MedicationLog } from "@/medLogs/interfaces/medicationLog.interface";

export const mapMedicationLog = (log: any): MedicationLog => ({
  id: log.id,
  takenAt: log.takenAt,
  scheduleId: log.scheduleId,
  logDate: log.logDate,
  medicationName: log.medicationName,
  medicationDosage: log.medicationDosage,
});

export const getMedicationLogs = async (): Promise<MedicationLog[]> => {
  const { data } = await api.get("/medication-logs");
  return data.map(mapMedicationLog);
};

export const createMedicationLog = async (data: {
  scheduleId: number;
  takenAt: string;
  logDate: string;
}): Promise<MedicationLog> => {
  const res = await api.post("/medication-logs", data);
  return mapMedicationLog(res.data);
};

export const deleteMedicationLog = async (id: number) => {
  await api.delete(`/medication-logs/${id}`);
};