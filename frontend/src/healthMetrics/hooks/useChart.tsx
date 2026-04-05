import { useMemo } from "react";
import { format } from "date-fns";
import type { HealthEntry, MetricType } from "../types/health.types";
import { defaultConfig } from "../helper/chartConfig.util";

interface Props {
  entries: HealthEntry[];
  metric: MetricType;
}

interface ChartLine {
  dataKey: string;
  color: string;
}

export const useHealthChartData = ({ entries, metric }: Props) => {


  return useMemo(() => {
    if (!entries || entries.length === 0) {
      return {
        chartData: [],
        lines: [],
        hasEnoughData: false,
        config: defaultConfig,
      };
    }

    // Ordenamos de más antiguo a reciente
    const sorted = [...entries].sort((a, b) =>
      `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`)
    );

    const chartData = sorted.map((e) => ({
      date: format(new Date(e.date), "MMM dd"),
      systolic: e.type === "blood_pressure" ? Number(e.value) : undefined,
      diastolic: e.type === "blood_pressure" ? Number(e.value2) : undefined,
      glucose: e.type === "blood_glucose" ? Number(e.value) : undefined,
      temperature: e.type === "temperature" ? Number(e.value) : undefined,
    }));

    const lineConfig: Record<string, ChartLine> = {
      systolic: { dataKey: "systolic", color: "red" },
      diastolic: { dataKey: "diastolic", color: "blue" },
      glucose: { dataKey: "glucose", color: "hsl(210, 80%, 55%)" },
      temperature: { dataKey: "temperature", color: "hsl(38, 92%, 50%)" },
    };

    let lines: ChartLine[] = [];
    if (metric === "blood_pressure") lines = [lineConfig.systolic, lineConfig.diastolic];
    if (metric === "blood_glucose") lines = [lineConfig.glucose];
    if (metric === "temperature") lines = [lineConfig.temperature];

    return {
      chartData,
      lines,
      hasEnoughData: chartData.length >= 2,
      config: defaultConfig,
    };
  }, [entries, metric]);
};
