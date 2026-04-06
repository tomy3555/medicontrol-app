import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";

import type { HealthEntry, HealthFormData, MetricType } from "../types/health.types";
import { createHealthMetric, deleteHealthMetric, getHealthMetrics } from "@/healthMetrics/services/health-metrics.service";



export const useHealthMetrics = () => {

  const [entries, setEntries] = useState<HealthEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeMetric, setActiveMetric] = useState<MetricType>("blood_pressure");
  const [viewMode, setViewMode] = useState<"data" | "chart">("data");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [formData, setFormData] = useState<HealthFormData>({
    type: "blood_pressure" as MetricType,
    value: "",
    value2: undefined,
    date: format(new Date(), "yyyy-MM-dd"),
    time: format(new Date(), "HH:mm"),
    notes: "",
  });


  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const data = await getHealthMetrics();

  
      const mapped = data.map((m: any) => ({
        id: String(m.id),
        type: m.type,
        value: String(m.value),
        value2: m.value2 ? String(m.value2) : undefined,
        unit: m.unit,
        date: m.date,
        time: m.time,
        notes: m.notes || "",
      }));

      setEntries(mapped);
    } catch (error) {
      console.error(error);
      toast.error("Error loading metrics");


      setEntries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);


  const filteredEntries = useMemo(() => {
    return entries
      .filter((e) => e.type === activeMetric)
      .sort((a, b) =>
        `${b.date}T${b.time}`.localeCompare(`${a.date}T${a.time}`)
      );
  }, [entries, activeMetric]);

  const getUnit = (type: MetricType) => {
  switch (type) {
    case "blood_pressure":
      return "mmHg";
    case "blood_glucose":
      return "mg/dL";
    case "temperature":
      return "°C";
  }
};

  const handleAdd = async () => {
    try {
      if (!formData.value) {
        toast.error("Please enter a value");
        return;
      }

      const value = Number(formData.value);

      if (value <= 0) {
        toast.error("Value must be greater than 0");
        return;
      }

      const payload: any = {
        type: formData.type,
        value,
        unit: getUnit(formData.type),
        date: formData.date,
        time: formData.time,
        notes: formData.notes,
      };

      // solo para blood pressure
      if (formData.type === "blood_pressure") {
        const value2 = Number(formData.value2);

        if (!formData.value2 || value2 <= 0) {
          toast.error("Second value must be greater than 0");
          return;
        }

        payload.value2 = value2;
      }

      await createHealthMetric(payload);

      toast.success("Metric added");

      setIsAddOpen(false);
      fetchMetrics();
    } catch (error) {
      toast.error("Error creating metric");
    }
  };



  const handleDelete = async (id: number) => {
  try {
    await deleteHealthMetric(Number(id));
    toast.success("Deleted");
    fetchMetrics();
  } catch {
    toast.error("Error deleting");
  }
};

  return {
    entries,
    filteredEntries,
    loading,

    activeMetric,
    setActiveMetric,

    viewMode,
    setViewMode,

    isAddOpen,
    setIsAddOpen,

    deleteId,
    setDeleteId,

    formData,
    setFormData,

    handleAdd,
    handleDelete,
  };
};
