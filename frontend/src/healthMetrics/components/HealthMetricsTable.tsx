import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Activity, Trash2, TrendingUp } from "lucide-react";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import type { HealthEntry, MetricType } from "../types/health.types";
import { useHealthChartData } from "../hooks/useChart";

interface Props {
  entries: HealthEntry[];
  activeMetric: MetricType;
  onDelete: (id: number) => void;
}

export const HealthMetricsTable = ({ entries, activeMetric, onDelete }: Props) => {
  const [viewMode, setViewMode] = useState<"data" | "chart">("data");

  // Filtramos por métrica activa
  const filtered = entries
    .filter((m) => m.type === activeMetric)
    .sort((a, b) => `${b.date}T${b.time}`.localeCompare(`${a.date}T${a.time}`));

  const { chartData, lines, hasEnoughData, config } = useHealthChartData({
    entries: filtered,
    metric: activeMetric,
  });

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <CardTitle className="text-base font-semibold capitalize">
              {activeMetric.replace("_", " ")}
            </CardTitle>
          </div>

          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)}>
            <TabsList className="h-8">
              <TabsTrigger value="data" className="text-xs px-3">
                Data
              </TabsTrigger>
              <TabsTrigger value="chart" className="text-xs px-3">
                Chart
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>

      <CardContent>
        {viewMode === "data" ? (
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Date</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>

              <TableBody>
                {filtered.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell>
                      {`${e.date} ${e.time.split(":").slice(0, 2).join(":")}`}
                    </TableCell>
                    <TableCell>
                      {e.type === "blood_pressure" ? `${e.value}/${e.value2}` : e.value} {e.unit}
                    </TableCell>
                    <TableCell>{e.notes || "—"}</TableCell>
                    <TableCell>
                      <Button size="icon" variant="ghost" onClick={() => onDelete(+e.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="h-80">
            {!hasEnoughData ? (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <TrendingUp className="opacity-30" />
              </div>
            ) : (
              <ChartContainer config={config} className="h-full">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  {lines.map((line) => (
                    <Line key={line.dataKey} type="monotone" dataKey={line.dataKey} stroke={line.color} />
                  ))}
                </LineChart>
              </ChartContainer>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
