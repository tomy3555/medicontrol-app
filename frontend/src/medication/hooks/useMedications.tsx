import { useEffect, useState } from "react";
import {
  getMedications,
  createMedication,
  deleteMedication,
  updateMedication as updateMedicationService
} from "@/medication/services/medicationService";

import type { Medication } from "@/medication/interfaces/medication.interface";

import { toast } from "sonner";

export const useMedications = () => {

  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMedications = async () => {
    try {
      const data = await getMedications();
      setMedications(data);
    } catch (error) {
      console.error(error);
      toast.error('Error loading medications')
    } finally {
      setLoading(false);
    }
  };

  const addMedication = async (med: Partial<Medication>) => {
    try {
      const newMed = await createMedication(med);
      setMedications((prev) => [...prev, newMed]);
      return newMed;
      
    } catch (error) {
      toast.error('Error while adding medication')
      
    }
  };

  const updateMedication = async (id: string, data: Partial<Medication>) => {
    const updated = await updateMedicationService(id, data);

    setMedications((prev) =>
      prev.map((m) => (m.id === id ? updated : m))
    );
  };

  const removeMedication = async (id: string) => {
    try {
      await deleteMedication(id);
      setMedications((prev) => prev.filter(m => m.id !== id));
      toast.success('Medication removed')
      
    } catch (error) {
      toast.error('Error while removing medication')
    }
  };

  useEffect(() => {
    fetchMedications();
  }, []);

  return {
    medications,
    loading,
    addMedication,
    removeMedication,
    updateMedication,
    refetch: fetchMedications
  };
};
