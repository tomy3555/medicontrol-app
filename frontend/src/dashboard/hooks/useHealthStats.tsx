import type { HealthEntry, MetricType } from "@/healthMetrics/types/health.types";

import { format } from "date-fns";

import { metricConfig } from "../helpers/metricConfig.util";


interface Props {
  metrics: HealthEntry[];
}

export const useHealthStats = ({ metrics }: Props) => {
  const getLatest = (type: MetricType) => {
    return metrics
      .filter((m) => m.type === type)
      .sort((a, b) =>
        `${b.date}T${b.time}`.localeCompare(`${a.date}T${a.time}`)
      )[0];
  };

  //control de valores para cada métrica
  const getStatus = (metric: HealthEntry) => {
    if (metric.type === "blood_pressure") {
      const sys = +metric.value;
      if (sys < 120) return { label: "Normal", color: "text-success" };
      if (sys < 140) return { label: "Elevated", color: "text-warning" };
      return { label: "High", color: "text-destructive" };
    }

    if (metric.type === "blood_glucose") {
      const val = +metric.value;
      if (val < 100) return { label: "Normal", color: "text-success" };
      if (val < 126) return { label: "Elevated", color: "text-warning" };
      return { label: "High", color: "text-destructive" };
    }

    const val = +metric.value;
    if (val >= 36.1 && val <= 37.2)
      return { label: "Normal", color: "text-success" };
    if (val <= 38) return { label: "Low Fever", color: "text-warning" };
    return { label: "Fever", color: "text-destructive" };
  };

  // mapear cada métrica con su última entrada y su estado
  const data = (Object.keys(metricConfig) as MetricType[]).map((type) => {
    const latest = getLatest(type);
    const config = metricConfig[type];

    if (!latest) {
      return {
        label: config.label,
        value: "—",
        unit: config.unit,
        status: "No data",
        statusColor: "text-muted-foreground",
        icon: config.icon,
        time: "",
      };
    }

    const status = getStatus(latest);

    return {
      label: config.label,
      value:
        type === "blood_pressure"
          ? `${latest.value}/${latest.value2}`
          : latest.value,
      unit: latest.unit,
      status: status.label,
      statusColor: status.color,
      icon: config.icon,
      time: `${format(new Date(latest.date), "MMM dd")}, ${latest.time}`,
    };
  });

  return {
    stats: data,
  };
};
