export enum WeekDay {
  MON = 'mon',
  TUE = 'tue',
  WED = 'wed',
  THU = 'thu',
  FRI = 'fri',
  SAT = 'sat',
  SUN = 'sun',
}

export const WEEK_DAYS: { label: string; value: WeekDay }[] = [
  { label: "Mon", value: WeekDay.MON },
  { label: "Tue", value: WeekDay.TUE },
  { label: "Wed", value: WeekDay.WED },
  { label: "Thu", value: WeekDay.THU },
  { label: "Fri", value: WeekDay.FRI },
  { label: "Sat", value: WeekDay.SAT },
  { label: "Sun", value: WeekDay.SUN },
];