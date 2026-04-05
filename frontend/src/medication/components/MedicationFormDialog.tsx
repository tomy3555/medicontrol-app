import { type Medication } from "@/medication/interfaces/medication.interface";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;

  form: Partial<Medication>;
  setForm: React.Dispatch<React.SetStateAction<Partial<Medication>>>;

  onSave: () => void;

  editingMed: Medication | null;
}

export const MedicationFormDialog = ({
  open,
  setOpen,
  form,
  setForm,
  onSave,
  editingMed,
}: Props) => {
  return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>

          <DialogHeader>
            <DialogTitle>
              {editingMed ? "Edit Medication" : "Add Medication"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            {/* Name */}
            <Input
              placeholder="Medication name"
              value={form.name || ""}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            {/* Dose */}
            <Input
              placeholder="Dose (e.g. 500mg)"
              value={form.dosage || ""}
              onChange={(e) =>
                setForm({ ...form, dosage: e.target.value })
              }
            />

            {/* Notes */}
            <Input
              placeholder="Notes (optional)"
              value={form.notes || ""}
              onChange={(e) =>
                setForm({ ...form, notes: e.target.value })
              }
            />
          </div>

          <DialogFooter>
            <Button className="cursor-pointer" onClick={onSave}>
              {editingMed ? "Update" : "Create"}
            </Button>
          </DialogFooter>

        </DialogContent>
      </Dialog>
  );
};
