import type { WeekDay } from "@/types/week-day.enum";

// Convierte WeekDay a YYYY-MM-DD según la semana de selectedDate
export const dayToString = (weekDay: WeekDay, selectedDate: Date): string => {
  // obtener el día de la semana de selectedDate (0=Domingo, 1=Lunes...)
  const dayIndexMap: Record<WeekDay, number> = {
    sun: 0,
    mon: 1,
    tue: 2,
    wed: 3,
    thu: 4,
    fri: 5,
    sat: 6,
  };

  const targetIndex = dayIndexMap[weekDay];
  const currentIndex = selectedDate.getDay(); // 0-6

  // diferencia de días
  const diff = targetIndex - currentIndex;

  const targetDate = new Date(selectedDate);
  targetDate.setDate(selectedDate.getDate() + diff);

  return targetDate.toISOString().split("T")[0]; // YYYY-MM-DD
};
