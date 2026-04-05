export type MetricType =
  | "blood_pressure"
  | "blood_glucose"
  | "temperature";

export interface HealthEntry {
  id: string;
  type: MetricType;
  value: string;
  value2?: string;
  unit: string;
  date: string; // yyyy-mm-dd
  time: string; // HH:mm
  notes?: string;
}

export interface CreateHealthMetricDto {
  type: MetricType;
  value: number;
  value2?: number;
  unit: string;
  date: string;
  time: string;
  notes?: string;
}

export interface HealthFormData {
  type: MetricType;
  value: string;
  value2?: string | undefined;
  date: string;
  time: string;
  notes: string;
}

