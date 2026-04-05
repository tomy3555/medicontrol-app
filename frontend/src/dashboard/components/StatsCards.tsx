import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Pill, CheckCircle2, Clock, Flame } from "lucide-react";

import { useDashboardStats } from "../hooks/useDashboardStats";

import type { Schedule } from "@/schedule/interfaces/schedules.interface";
import type { MedicationLog } from "@/medLogs/interfaces/medicationLog.interface";

interface Props {
  schedules: Schedule[];
  logs: MedicationLog[];
}

export const StatsCards = ({ schedules, logs }: Props) => {

  const { expected, taken, remaining, streak, completion, nextDoseWithMed } =
    useDashboardStats({
      schedules,
      logs,
  });


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

      {/* TODAY MEDICATIONS */}
      <Card className="shadow-md border border-blue-100 bg-blue-50/50">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Today's Medications
          </CardTitle>

          <div className="h-9 w-9 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <Pill className="h-4 w-4 text-emerald-600" />
          </div>
        </CardHeader>

        <CardContent>
          <div className="text-2xl font-bold text-emerald-900">
            {expected}
          </div>

          <p className="text-xs text-muted-foreground mt-1">
            {taken} taken · {remaining} remaining
          </p>
        </CardContent>
      </Card>

      {/* COMPLETION */}
      <Card className="shadow-md border border-blue-100 bg-blue-50/50">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Completion
          </CardTitle>

          <CheckCircle2 className="h-4 w-4 text-blue-600" />
        </CardHeader>

        <CardContent>
          <div className="text-2xl font-bold text-blue-900">
            {completion}%
          </div>

          <p className="text-xs text-muted-foreground mt-1">
            Daily adherence
          </p>
        </CardContent>
      </Card>


      {/* STREAK */}
      <Card className="shadow-md border border-rose-100 bg-rose-50/50">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Streak
          </CardTitle>

          <Flame className="h-4 w-4 text-rose-500" />
        </CardHeader>

        <CardContent>
          <div className="text-2xl font-bold text-rose-600">
            {streak} 🔥
          </div>

          <p className="text-xs text-muted-foreground mt-1">
            Consecutive perfect days
          </p>
        </CardContent>
      </Card>


      {/* NEXT DOSE (En cuanto a hora) */}
      <Card className="shadow-md border border-orange-100 bg-orange-50/50">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Next Dose
          </CardTitle>

          <Clock className="h-4 w-4 text-orange-600" />
        </CardHeader>

        <CardContent>
          <div className="text-lg font-bold text-orange-900">
            {nextDoseWithMed ? nextDoseWithMed.time : "--:--"}
          </div>

          <p className="text-xs text-muted-foreground mt-1">
            {nextDoseWithMed
              ? nextDoseWithMed.medicationName ?? "Unknown"
              : "No more today"}
          </p>
        </CardContent>
      </Card>

    </div>
  );
};