import { Card, CardContent } from "@/components/ui/card";
import type { Medication } from "@/medication/interfaces/medication.interface";
import { Pill } from "lucide-react";

interface Props {
  medications: Medication[];
}

export const MedicationsSummaryCard = ({ medications }: Props) => {

 const safeMedications = medications ?? [];
  const total = safeMedications.length;




  return (
    <Card className="shadow-md border border-emerald-100 bg-linear-to-r mb-4 to-emerald-100/40">
      <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          
          <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <Pill className="h-5 w-5 text-emerald-600" />
          </div>

          <div>
            <p className="text-sm text-emerald-700 font-medium">
              Medications
            </p>
            <p className="text-2xl font-bold text-emerald-900">
              {total}
            </p>
          </div>

        </div>


      </CardContent>
    </Card>
  );
};
