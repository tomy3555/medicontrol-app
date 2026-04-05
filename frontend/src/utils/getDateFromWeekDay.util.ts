import { formatLogDate } from "@/utils/fromatLogDate.util";
import { WeekDay } from "@/types/week-day.enum";

const dayMap: Record<WeekDay, number> = {
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6,
};

export const getDateFromWeekDay = (day: WeekDay): string => {
  const today = new Date();
  const target = dayMap[day]; // 0 = sun, 1 = mon, etc.

  let diff = target - today.getDay();

  // si el día ya pasó esta semana, no queremos ir a la semana anterior
  if (diff < 0) diff += 7;

  const date = new Date(today);
  date.setDate(today.getDate() + diff);
  date.setHours(0, 0, 0, 0);

  return formatLogDate(date);
};

