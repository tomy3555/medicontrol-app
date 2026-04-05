export const isWithinLastDays = (dateStr: string, days: number) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const date = new Date(dateStr);
  const diff = (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);

  return diff >= 0 && diff <= days;
};