import { useState } from "react";
import { toast } from "sonner";
import type { Medication } from "@/medication/interfaces/medication.interface";
import type { WeekDay } from "@/types/week-day.enum";

interface Props {
  onAssign: (data: {
    medicationId: number;
    time: string;
    days: WeekDay[];
  }) => Promise<void>;

  onCreateAndAssign: (data: {
    medication: Partial<Medication>;
    time: string;
    days: WeekDay[];
  }) => Promise<void>;

  onOpenChange: (open: boolean) => void;
}

export const useSave = ({
  onAssign,
  onCreateAndAssign,
  onOpenChange,
}: Props) => {
  const [time, setTime] = useState("08:00");
  const [days, setDays] = useState<WeekDay[]>([]);
  const [mode, setMode] = useState<"existing" | "new">("existing");
  const [selectedMedId, setSelectedMedId] = useState<number | null>(null);
  const [newMed, setNewMed] = useState<Partial<Medication>>({
    name: "",
    dosage: "",
  });

  const toggleDay = (day: WeekDay) => {
    setDays((prev) =>
      prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day]
    );
  };

  const resetForm = () => {
    setSelectedMedId(null);
    setNewMed({ name: "", dosage: "" });
    setDays([]);
    setTime("08:00");
    setMode("existing");
  };

  const handleSave = async () => {
    if (!time || days.length === 0) {
      toast.error("Time and days are required.");
      return;
    }

    try {
      if (mode === "existing") {
        if (!selectedMedId) {
          toast.error("Select a medication.");
          return;
        }

        await onAssign({
          medicationId: selectedMedId,
          time,
          days,
        });

        toast.success("Medication scheduled.");
      } else {
        if (!newMed.name || !newMed.dosage) {
          toast.error("Name and dosage are required.");
          return;
        }

        await onCreateAndAssign({
          medication: newMed,
          time,
          days,
        });

        toast.success("Medication created and scheduled.");
      }

      onOpenChange(false);
      resetForm();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  return {
    // state
    time,
    days,
    mode,
    selectedMedId,
    newMed,

    // setters
    setTime,
    setMode,
    setSelectedMedId,
    setNewMed,

    // actions
    toggleDay,
    handleSave,
  };
};
