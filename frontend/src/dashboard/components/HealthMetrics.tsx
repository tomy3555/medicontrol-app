import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { HealthEntry } from "@/healthMetrics/types/health.types";
import { useHealthStats } from "../hooks/useHealthStats";


interface Props {
  metrics: HealthEntry[];
}


export const HealthMetrics = ({ metrics }: Props) => {
  
  const { stats } = useHealthStats({metrics})
  
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Health Metrics
        </CardTitle>
      </CardHeader>

        <CardContent className="space-y-4">
          {stats.map((metric) => (
          <div key={metric.label} className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <metric.icon className="h-4 w-4 text-primary" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between">
                <p className="text-sm font-medium">{metric.label}</p>
                <span className={`text-xs font-medium ${metric.statusColor}`}>
                  {metric.status}
                </span>
              </div>

              <p className="text-lg font-bold">
                {metric.value}{" "}
                <span className="text-xs font-normal text-muted-foreground">
                  {metric.unit}
                </span>
              </p>

              <p className="text-xs text-muted-foreground">
                {metric.time.split(":").slice(0, 2).join(":")}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
