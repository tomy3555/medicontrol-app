import type { Medication } from "@/medication/interfaces/medication.interface";
import { useState } from "react";
import { toast } from "sonner";
// import { useMedications } from "./useMedications";
interface Props {
  addMedication: (data: Partial<Medication>) => Promise<void>;
  updateMedication: (id: string, data: Partial<Medication>) => Promise<void>;
}

export const useMedicationForm = ({ addMedication, updateMedication }: Props) => {

  const [form, setForm] = useState<Partial<Medication>>({});
  const [editingMed, setEditingMed] = useState<Medication | null>(null);
  const [open, setOpen] = useState(false);

  const openAdd = () => {
    setEditingMed(null);
    setForm({});
    setOpen(true);
  };

  const openEdit = (med: Medication) => {
    setEditingMed(med);

    setForm({
      name: med.name,
      dosage: med.dosage,
      notes: med.notes,
      status: med.status,
    });

    setOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.dosage) return;

    if (editingMed) {
      await updateMedication(editingMed.id, form);
      toast.success('Medication updated')
    } else {
      await addMedication(form);
      toast.success('Medication added')
    }

    setOpen(false);
  };

  return {
    form,
    setForm,
    open,
    setOpen,
    openAdd,
    openEdit,
    handleSave,
    editingMed
  };
};
