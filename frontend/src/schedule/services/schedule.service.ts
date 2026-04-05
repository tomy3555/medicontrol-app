import { api } from "@/app/axios"; // tu axiosInstance
import type { Schedule } from "@/schedule/interfaces/schedules.interface";



export const getSchedules = async (): Promise<Schedule[]> => {
  const res = await api.get("/schedules");
  return res.data;
};


export const createSchedule = async (data: Partial<Schedule>): Promise<Schedule> => {
  const res = await api.post("/schedules", data);
  return res.data;
};


export const updateSchedule = async (
  id: number,
  data: Partial<Schedule>
): Promise<Schedule> => {
  const res = await api.patch(`/schedules/${id}`, data);
  return res.data;
};

export const deleteSchedule = async (id: number) => {
  const res = await api.delete(`/schedules/${id}`);
  return res.data;
};
