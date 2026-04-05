import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import type { Schedule } from "@/schedule/interfaces/schedules.interface";
import type { MedicationLog } from "@/medLogs/interfaces/medicationLog.interface";

import { useTodayMedications } from "../hooks/useTodayMedications";

import { statusConfig } from "../helpers/statusConfig.util";

interface Props {
  schedules: Schedule[];
  logs: MedicationLog[];
}

export function TodayMedications({ schedules, logs }: Props) {
  const { todayMeds } = useTodayMedications({
    schedules,
    logs,
  });

  // cuando no hay meds hoy
  if (!todayMeds || todayMeds.length === 0) {
    return (
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Today's Schedule
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 text-center text-muted-foreground">
          No medications for today 
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Today's Schedule
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {todayMeds.map((med) => {
          const config = statusConfig[med.status];
          const Icon = config.icon;

          return (
            <div
              key={med.id}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/40 hover:bg-muted/70 transition-colors"
            >
              {/* LEFT */}
              <div className="flex items-center gap-3">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center ${config.className}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </div>

                <div>
                  <p className="text-sm font-medium">
                    {med.name}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {med.dosage} · {med.time}
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <Badge
                className={`text-xs ${config.className}`}
              >
                {config.label}
              </Badge>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
