import { getTodayWeekDay } from "@/utils/getTodayWeekDay.util";
import { WeekDay, WEEK_DAYS } from "../../types/week-day.enum"
import type { Schedule } from "@/schedule/interfaces/schedules.interface";

interface Props {
  selectedDay: WeekDay;
  onSelectDay: (day: WeekDay) => void;
  schedules: Schedule[];
}

export const DaySelector = ({
  selectedDay,
  onSelectDay,
  schedules,
}: Props) => {
  const today = getTodayWeekDay();

  const getDayCount = (day: WeekDay) => {
    return schedules.filter((s) =>
      s.days.includes(day)
    ).length;
  };

  return (
    <div className="grid grid-cols-7 gap-2">
      {WEEK_DAYS.map(({ label, value }) => {
        const count = getDayCount(value);
        const isSelected = value === selectedDay;
        const isToday = value === today;

        return (
          <button
            key={value}
            onClick={() => onSelectDay(value)}
            className={`rounded-xl p-3 text-center transition-all border ${
              isSelected
                ? "bg-primary text-primary-foreground shadow-md border-primary"
                : "bg-card hover:bg-accent border-border"
            }`}
          >
            {/* Label */}
            <p
              className={`text-xs font-medium ${
                isSelected
                  ? "text-primary-foreground/80"
                  : "text-muted-foreground"
              }`}
            >
              {label}
            </p>

            {/* Count */}
            <p className="text-lg font-bold">{count}</p>

            {/* Text */}
            <p
              className={`text-[10px] ${
                isSelected
                  ? "text-primary-foreground/70"
                  : "text-muted-foreground"
              }`}
            >
              {count === 1 ? "med" : "meds"}
            </p>

            {/* Today indicator */}
            {isToday && (
              <div
                className={`mx-auto mt-1 h-1 w-4 rounded-full ${
                  isSelected
                    ? "bg-primary-foreground/50"
                    : "bg-primary/40"
                }`}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};