import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: () => void;
}

export const DeleteMedicationDialog = ({
  open,
  setOpen,
  onConfirm,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>

        <DialogHeader>
          <DialogTitle>Delete Medication</DialogTitle>
        </DialogHeader>

        <DialogFooter>
          <Button className="cursor-pointer" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button className="cursor-pointer" variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
};
