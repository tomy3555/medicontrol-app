import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { HealthFormData, MetricType } from "../types/health.types";



const metricConfigHealth = {
  blood_pressure: { unit: "mmHg" },
  blood_glucose: { unit: "mg/dL" },
  temperature: { unit: "°C" },
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: HealthFormData;
  setFormData: React.Dispatch<React.SetStateAction<HealthFormData>>;
  onSave: () => void;
}

export const AddHealthMetricDialog = ({
  open,
  onOpenChange,
  formData,
  setFormData,
  onSave,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Log Health Reading</DialogTitle>
          <DialogDescription>
            Record a new health metric reading
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">

          {/* TYPE */}
          <div className="space-y-2">
            <Label>Metric Type</Label>
            <Select
              value={formData.type}
              onValueChange={(v) =>
                setFormData({ ...formData, type: v as MetricType })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blood_pressure">
                  Blood Pressure
                </SelectItem>
                <SelectItem value="blood_glucose">
                  Blood Glucose
                </SelectItem>
                <SelectItem value="temperature">
                  Temperature
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* VALUES */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>
                {formData.type === "blood_pressure"
                  ? "Systolic (mmHg)"
                  : `Value (${metricConfigHealth[formData.type].unit})`}
              </Label>

              <Input
                type="number"
                value={formData.value}
                onChange={(e) =>
                  setFormData({ ...formData, value: e.target.value })
                }
              />
            </div>

            {formData.type === "blood_pressure" ? (
              <div className="space-y-2">
                <Label>Diastolic (mmHg)</Label>
                <Input
                  type="number"
                  placeholder="80"
                  value={formData.value2 || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      value2: e.target.value || undefined, // 👈 importante
                    })
                  }
                />
              </div>
            ) : (
              <div />
            )}
          </div>

          {/* DATE + TIME */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Time</Label>
              <Input
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
              />
            </div>
          </div>

          {/* NOTES */}
          <div className="space-y-2">
            <Label>Notes (optional)</Label>
            <Input
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            />
          </div>

        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>

          <Button onClick={onSave}>
            Save Reading
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
