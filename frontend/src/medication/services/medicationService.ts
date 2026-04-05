import { api } from "@/app/axios";

import type { Medication } from "@/medication/interfaces/medication.interface";

export const getMedications = async (): Promise<Medication[]> => {
  const res = await api.get("/medications");
  return res.data;
};

export const createMedication = async (data: Partial<Medication>) => {
  const res = await api.post('/medications', data);
  return res.data; 
};

export const updateMedication = async (id: string, data: Partial<Medication>) => {
  const res = await api.patch(`/medications/${id}`, data);
  return res.data;
};

export const deleteMedication = async (id: string) => {
  await api.delete(`/medications/${id}`);
};