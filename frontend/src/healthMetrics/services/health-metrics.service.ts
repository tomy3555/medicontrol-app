import { api } from "@/app/axios";
import type { CreateHealthMetricDto, HealthEntry } from "@/healthMetrics/types/health.types";


export const getHealthMetrics = async (): Promise<HealthEntry[]> => {
  const res = await api.get("/health-metrics");
  return res.data;
};


export const getHealthMetricById = async (
  id: number
): Promise<HealthEntry> => {
  const res = await api.get(`/health-metrics/${id}`);
  return res.data;
};


export const createHealthMetric = async (
  data: CreateHealthMetricDto
): Promise<HealthEntry> => {
  const res = await api.post("/health-metrics", data);
  return res.data;
};


export const updateHealthMetric = async (
  id: number,
  data: Partial<CreateHealthMetricDto>
): Promise<HealthEntry> => {
  const res = await api.patch(`/health-metrics/${id}`, data);
  return res.data;
};


export const deleteHealthMetric = async (id: number) => {
  const res = await api.delete(`/health-metrics/${id}`);
  return res.data;
};
