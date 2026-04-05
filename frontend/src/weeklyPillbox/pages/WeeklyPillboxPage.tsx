import { useState, useMemo } from "react";

import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";

import { DaySelector } from "../components/DaySelector";
import { TimeSlotGroup } from "../components/TimeSlot";
import { AddMedicationToScheduleDialog } from "../components/AddMedicationDialog";
import { DayProgressCard } from "../components/DayProgressCard";
import { DashboardLayout } from "@/shared/DashboardLayout";

import { WeekDay } from "@/types/week-day.enum";
import type { Schedule } from "@/schedule/interfaces/schedules.interface";

import { usePillbox } from "../hooks/useWeeklyPillbox";
import { useProgress } from "../hooks/useProgress";
import { useSchedules } from "@/schedule/hooks/useSchedule";
import { useMedicationLogs } from "@/medLogs/hooks/useMedications-logs";

import { getTodayWeekDay } from "@/utils/getTodayWeekDay.util";
import { getDateFromWeekDay } from "@/utils/getDateFromWeekDay.util";

export default function WeeklyPillboxPage() {
  const { medications } = usePillbox();
  const { schedules, addSchedule, removeSchedule } = useSchedules();
  const { logs, isTaken, handleToggleTaken } = useMedicationLogs();

  const [selectedDay, setSelectedDay] = useState<WeekDay>(getTodayWeekDay());
  const [dialogOpen, setDialogOpen] = useState(false);

  // Filtrar schedules por día
  const daySchedules = useMemo(
    () => schedules.filter(s => s.days.includes(selectedDay)),
    [schedules, selectedDay]
  );

  // Obtener fecha de la semana correspondiente al día seleccionado
  const selectedDateString = useMemo(
    () => getDateFromWeekDay(selectedDay),
    [selectedDay]
  );


  const { getDayProgress } = useProgress({ logs });
  const { total, taken } = getDayProgress(daySchedules, selectedDateString);

  console.log("PAGE schedules:", schedules);
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Weekly Pillbox</h1>
            <p className="text-sm text-muted-foreground">
              Organize your medications by day and time.
            </p>
          </div>
          <Button onClick={() => setDialogOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Schedule
          </Button>
        </div>

        <DaySelector
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
          schedules={schedules}
        />

        <DayProgressCard total={total} taken={taken} />

        <TimeSlotGroup
          data={daySchedules}
          selectedDate={selectedDateString}
          handleToggleTaken={async (schedule: Schedule, selectedDate: string) => {
            await handleToggleTaken(schedule, selectedDate);
          }}
          isTaken={isTaken}
          removeSchedule={removeSchedule}
        />

        <AddMedicationToScheduleDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          medications={medications}
          onAssign={async ({ medicationId, time, days }) => {
            await addSchedule({ medicationId, time, days });
          }}
          onCreateAndAssign={async ({ medication, time, days }) => {
            await addSchedule({
              name: medication.name,
              dosage: medication.dosage,
              time,
              days,
            });
          }}
        />
      </div>
    </DashboardLayout>
  );
}
