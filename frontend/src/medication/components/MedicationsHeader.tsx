import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface Props {
  onAdd: () => void;
}

export const MedicationsHeader = ({ onAdd }: Props) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Medications</h1>

      <Button onClick={onAdd} className="gap-2 px-3 mt-3 mb-1 cursor-pointer">
        <Plus className="h-4 w-4" />
        Add Medication
      </Button>
    </div>
  );
};
