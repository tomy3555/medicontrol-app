import { formatLogDate } from "@/utils/fromatLogDate.util";
import { WeekDay } from "@/types/week-day.enum";

const dayMap: Record<WeekDay, number> = {
  sun: 7, 
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6,
};

export const getDateFromWeekDay = (day: WeekDay): string => {
  const today = new Date();

  const target = dayMap[day];


  const current = today.getDay() === 0 ? 7 : today.getDay();

  const diff = target - current;

  const date = new Date(today);
  date.setDate(today.getDate() + diff);
  date.setHours(0, 0, 0, 0);

  return formatLogDate(date);
};



