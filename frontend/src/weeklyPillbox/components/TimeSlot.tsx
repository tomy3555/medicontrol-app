import { Check, Clock, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";



import type { Schedule } from "@/schedule/interfaces/schedules.interface";

import { groupSchedulesByTime } from "@/schedule/helpers/schedule.util";

interface Props {
  data: Schedule[];
  selectedDate: string;
  isTaken: (scheduleId: number, selectedDate: string) => boolean;
  handleToggleTaken: (schedule: Schedule, selectedDate: string) => Promise<void>;
  removeSchedule: (id: number) => Promise<void>;
}

export const TimeSlotGroup = ({ data, isTaken, removeSchedule, selectedDate, handleToggleTaken }: Props) => {

  if (!data.length) return <div className="text-center py-10 text-muted-foreground">No medications for this day.</div>;

  const grouped = groupSchedulesByTime(data);

  const sortedTimes = Object.keys(grouped).sort();

 
  return (
    <div className="space-y-4">
      {sortedTimes.map(time => (
        <div key={time} className="rounded-xl border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="font-semibold text-sm flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              {time}
            </p>
            <Badge variant="outline" className="text-xs">Medication</Badge>
          </div>

          <div className="space-y-2">
            {grouped[time].map(schedule => {
              const takenToday = isTaken(schedule.id, selectedDate);

              return (
                <div
                  key={schedule.id}
                  className={`flex items-center gap-3 rounded-lg border p-3 transition-all ${
                    takenToday
                      ? "bg-green-50 border-green-200"
                      : "bg-card border-border hover:border-primary/40"
                  }`}
                >
                  <Button
                    size="icon"
                    variant="ghost"
                    className={`h-7 w-7 rounded-full border transition-all ${
                      takenToday ? "bg-green-500 border-green-500 text-white" : "border-muted-foreground/30"
                    }`}
                    onClick={() => handleToggleTaken(schedule, selectedDate)}
                  >
                    {takenToday && <Check className="h-4 w-4" />}
                  </Button>

                  <div className="flex-1">
                    <p className={`text-sm font-medium ${takenToday ? "line-through text-muted-foreground" : ""}`}>
                      {schedule.medicationName ?? "Unknown medication"}
                    </p>
                    <p className="text-xs text-muted-foreground">{schedule.medicationDosage ?? "-"}</p>
                  </div>

                  <Badge variant="outline" className={`text-xs ${
                    takenToday
                      ? "bg-green-100 text-green-700 border-green-200"
                      : "bg-yellow-100 text-yellow-700 border-yellow-200"
                  }`}>
                    {takenToday ? "Taken" : "Pending"}
                  </Badge>

                  <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => removeSchedule(schedule.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
