import { useState } from "react";
import { DeleteMedicationDialog } from "../components/DeleteMedicationDialog";
import { useMedicationForm } from "../hooks/useMedicationsForm";
import { useMedications } from "../hooks/useMedications";
import { DashboardLayout } from "@/shared/DashboardLayout";
import { MedicationsHeader } from "../components/MedicationsHeader";
import { MedicationsTable } from "../components/MedicationsTable";
import { MedicationFormDialog } from "../components/MedicationFormDialog";
import type { Medication } from "@/medication/interfaces/medication.interface";
import { MedicationsSummaryCard } from "../components/MedicationsSummaryCard";

export const MedicationsPage = () => {

  const { medications, addMedication, removeMedication, updateMedication } = useMedications();

  const formHook = useMedicationForm({addMedication, updateMedication});

  const [search, setSearch] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState<Medication | null>(null)

  const handleDelete = async () => {
    if (!selected) return;

    await removeMedication(selected.id);
    setDeleteOpen(false);
  };


  return (
    <DashboardLayout>

      <MedicationsHeader onAdd={formHook.openAdd} />

      <MedicationsSummaryCard medications={medications} />

      <MedicationsTable
        medications={medications}
        search={search}
        setSearch= {setSearch}
        onEdit={formHook.openEdit}
        onDelete={(m) => {
          setSelected(m);
          setDeleteOpen(true);
        }}
      />

      <MedicationFormDialog
            {...formHook}
            onSave={formHook.handleSave}
        />

      <DeleteMedicationDialog
        open={deleteOpen}
        setOpen={setDeleteOpen}
        onConfirm={handleDelete}
      />

    </DashboardLayout>
  );
};
