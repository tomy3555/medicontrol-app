import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Plus, CalendarDays, Activity } from "lucide-react";

import { useQuickActions } from "../hooks/useQuickActions";

export function QuickActions() {
  const {
    goToAddMedication,
    goToHealthMetrics,
    goToPillbox,
  } = useQuickActions();

  const actions = [
    {
      label: "Add Medication",
      icon: Plus,
      description: "Register a new medication",
      onClick: goToAddMedication,
    },
    {
      label: "Log Health Data",
      icon: Activity,
      description: "Record vitals or metrics",
      onClick: goToHealthMetrics,
    },
    {
      label: "View Pillbox",
      icon: CalendarDays,
      description: "Check your weekly plan",
      onClick: goToPillbox,
    },


  ];

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Quick Actions
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant="outline"
            onClick={action.onClick}
            className="h-auto flex-col items-start gap-1.5 p-4 text-left hover:bg-accent/60 hover:border-primary/20 cursor-pointer"
          >
            <action.icon className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">{action.label}</span>
            <span className="text-xs text-muted-foreground font-normal">
              {action.description}
            </span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
