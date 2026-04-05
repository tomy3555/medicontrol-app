import { WeekDay } from "../types/week-day.enum";

export const getTodayWeekDay = (): WeekDay => {
  const daysMap: WeekDay[] = [
    WeekDay.SUN, 
    WeekDay.MON, 
    WeekDay.TUE, 
    WeekDay.WED, 
    WeekDay.THU, 
    WeekDay.FRI, 
    WeekDay.SAT, 
  ];

  return daysMap[new Date().getDay()];
};