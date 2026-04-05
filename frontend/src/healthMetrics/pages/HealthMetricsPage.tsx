import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { useHealthMetrics } from "../hooks/useHealthMetrics";
import { HealthStatsCards } from "../components/HealthStatsCards";
import { HealthMetricsTable } from "../components/HealthMetricsTable";
import { DashboardLayout } from "@/shared/DashboardLayout";
import { AddHealthMetricDialog } from "../components/AddHealthDialog";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";


export default function HealthMetricsPage() {
  const {
    entries,
    activeMetric,
    setActiveMetric,
    isAddOpen,
    setIsAddOpen,
    formData,
    setFormData,
    handleAdd,
    handleDelete,
  } = useHealthMetrics();

  const [searchParams] = useSearchParams();

  useEffect(() => {
  if (searchParams.get("openAdd") === "true") {
    setIsAddOpen(true);
  }
}, []);
  

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Health Metrics</h1>

          <Button onClick={() => setIsAddOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add
          </Button>
        </div>

        {/* STATS */}
        <HealthStatsCards
          entries={entries}
          activeMetric={activeMetric}
          setActiveMetric={setActiveMetric}
        />

        {/* TABLE */}
        <HealthMetricsTable
          entries={entries}
          activeMetric={activeMetric}
          onDelete={handleDelete}
        />


        {/* DIALOG */}
        <AddHealthMetricDialog
          open={isAddOpen}
          onOpenChange={setIsAddOpen}
          formData={formData}
          setFormData={setFormData}
          onSave={handleAdd}
        />
      </div>
    </DashboardLayout>
  );
}
