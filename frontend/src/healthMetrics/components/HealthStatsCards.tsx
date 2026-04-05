import { Card, CardContent } from "@/components/ui/card";
import { Heart, Droplets, Thermometer } from "lucide-react";
import type { HealthEntry, MetricType } from "../types/health.types";


interface Props {
  entries: HealthEntry[];
  activeMetric: MetricType;
  setActiveMetric: (m: MetricType) => void;
}

export const HealthStatsCards = ({
  entries: metrics,
  activeMetric,
  setActiveMetric,
}: Props) => {
  const config = {
    blood_pressure: {
      label: "Blood Pressure",
      icon: Heart,
      color: "text-destructive",
      bg: "bg-destructive/10",
    },
    blood_glucose: {
      label: "Blood Glucose",
      icon: Droplets,
      color: "text-info",
      bg: "bg-info/10",
    },
    temperature: {
      label: "Temperature",
      icon: Thermometer,
      color: "text-warning",
      bg: "bg-warning/10",
    },
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {(Object.keys(config) as MetricType[]).map((type) => {
        const c = config[type];
        const Icon = c.icon;

        const filtered = metrics
          .filter((m) => m.type === type)
          .sort((a, b) => `${b.date}T${b.time}`.localeCompare(`${a.date}T${a.time}`));

        const latest = filtered[0];

        const isActive = activeMetric === type;

        return (
          <Card
            key={type}
            onClick={() => setActiveMetric(type)}
            className={`
              cursor-pointer transition-all duration-200
              ${isActive ? "ring-2 ring-primary scale-[1.02] shadow-lg" : "hover:scale-[1.01]"}
            `}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-lg ${c.bg} flex items-center justify-center`}>
                  <Icon className={`h-5 w-5 ${c.color}`} />
                </div>

                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">{c.label}</p>

                  <p className="text-lg font-bold">
                    {latest
                      ? latest.type === "blood_pressure"
                        ? `${latest.value}/${latest.value2}`
                        : latest.value
                      : "—"}
                    <span className="text-xs ml-1 text-muted-foreground">
                      {latest?.unit}
                    </span>
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {filtered.length} readings
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
