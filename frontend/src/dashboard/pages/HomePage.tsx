import { useSchedules } from "@/schedule/hooks/useSchedule";
import { HealthMetrics } from "../components/HealthMetrics";
import { QuickActions } from "../components/QuickActions";
import { StatsCards } from "../components/StatsCards";
import { TodayMedications } from "../components/TodayMedication";
import  { DashboardLayout } from "../../shared/DashboardLayout";
import { useMedicationLogs } from "@/medLogs/hooks/useMedications-logs";
import { useHealthMetrics } from "@/healthMetrics/hooks/useHealthMetrics";

const Index = () => {
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const { schedules } = useSchedules();
  const { logs } = useMedicationLogs();
  const { entries } = useHealthMetrics();

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{greeting()}</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Here's your health overview for today.
          </p>
        </div>

        {/* Stats */}
        <StatsCards schedules={schedules} logs={logs}  />

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TodayMedications schedules={schedules} logs={logs}/>
          </div>
          <div className="space-y-6">
            <HealthMetrics metrics={entries}/>
            <QuickActions />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;