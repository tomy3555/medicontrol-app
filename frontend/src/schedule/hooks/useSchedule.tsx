import type { Schedule } from "@/schedule/interfaces/schedules.interface";
import { createMedication } from "@/medication/services/medicationService";
import { createSchedule, deleteSchedule, getSchedules } from "@/schedule/services/schedule.service";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { CreateScheduleInput } from "../interfaces/schedulesInput.interface";




export const useSchedules = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const fetchSchedules = async () => {
    try {
      const data = await getSchedules();
      setSchedules(data);
      
    } catch (error) {
      toast.error('Error loading scheduled medications')
    }
    
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const addSchedule = async (input: CreateScheduleInput) => {
    let medId = input.medicationId;

    if (!medId && input.name && input.dosage) {
      const newMed = await createMedication({
        name: input.name,
        dosage: input.dosage,
      });
      toast.success('Medication created and added successfully');
      medId = newMed.id;
    }

    if (!medId) return;

    const newSchedule = await createSchedule({
      medicationId: medId,
      time: input.time,
      days: input.days,
    });
    toast.success('Medication scheduled successfully');
    setSchedules((prev) => [...prev, newSchedule]);
  };

  const removeSchedule = async (id: number) => {
    try {
      setSchedules(prev => prev.filter(s => s.id !== id));

      await deleteSchedule(id);

      toast.success('Scheduled medication removed');
    } catch (error) {
      toast.error('Error while removing scheduled medication');
    }
  };



  return {
    schedules,
    addSchedule,
    fetchSchedules,
    removeSchedule
  };
};
