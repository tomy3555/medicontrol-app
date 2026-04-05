import type { MetricType } from "@/healthMetrics/types/health.types";
import { Droplets, Heart, Thermometer } from "lucide-react";

export const metricConfig: Record<
  MetricType,
  { label: string; icon: any; unit: string }
> = {
  blood_pressure: {
    label: "Blood Pressure",
    icon: Heart,
    unit: "mmHg",
  },
  blood_glucose: {
    label: "Blood Glucose",
    icon: Droplets,
    unit: "mg/dL",
  },
  temperature: {
    label: "Temperature",
    icon: Thermometer,
    unit: "°C",
  },
};