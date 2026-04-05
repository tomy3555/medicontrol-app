import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Medication } from "@/medication/interfaces/medication.interface";
import  { type WeekDay, WEEK_DAYS } from "@/types/week-day.enum";
import { useSave } from "../hooks/useSave";


interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  medications: Medication[];

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
}


export const AddMedicationToScheduleDialog = ({medications,
  open,
  onOpenChange,
  onAssign,
  onCreateAndAssign,
}: Props) => {

    const {
    time,
    days,
    mode,
    newMed,
    setTime,
    setMode,
    setSelectedMedId,
    setNewMed,
    toggleDay,
    handleSave,
  } = useSave({
    onAssign,
    onCreateAndAssign,
    onOpenChange,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add to Pillbox</DialogTitle>
          <DialogDescription>
            Assign a medication to your weekly schedule.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">

          {/* Mode toggle */}
          <div className="flex gap-2">
            <Button
              variant={mode === "existing" ? "default" : "outline"}
              onClick={() => setMode("existing")}
            >
              Existing
            </Button>
            <Button
              variant={mode === "new" ? "default" : "outline"}
              onClick={() => setMode("new")}
            >
              New
            </Button>
          </div>

          {/* Existing meds */}
          {mode === "existing" && (
            <div className="space-y-2">
              <Label>Select Medication</Label>
              <Select onValueChange={(v) => setSelectedMedId(Number(v))}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose medication" />
                </SelectTrigger>
                <SelectContent>
                  {medications.map((m) => (
                    <SelectItem key={m.id} value={String(m.id)}>
                      {m.name} ({m.dosage})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* New med */}
          {mode === "new" && (
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={newMed.name}
                onChange={(e) =>
                  setNewMed({ ...newMed, name: e.target.value })
                }
              />

              <Label>Dosage</Label>
              <Input
                value={newMed.dosage}
                onChange={(e) =>
                  setNewMed({ ...newMed, dosage: e.target.value })
                }
              />
            </div>
          )}

          {/* Time */}
          <div className="space-y-2">
            <Label>Time</Label>
            <Input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          {/* Days */}
          <div className="space-y-2">
            <Label>Days</Label>

            <div className="grid grid-cols-2 gap-2">
              {WEEK_DAYS.map(({ label, value }) => (
                <label
                  key={value}
                  className={`flex items-center gap-2 border rounded-lg p-2 cursor-pointer ${
                    days.includes(value)
                      ? "border-primary bg-accent"
                      : "border-border"
                  }`}
                >
                  <Checkbox
                    checked={days.includes(value)}
                    onCheckedChange={() => toggleDay(value)}
                  />
                  <span className="text-sm">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};