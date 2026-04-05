import { Card, CardContent } from "@/components/ui/card";

interface Props {
  taken: number;
  total: number;
}

export const DayProgressCard = ({ taken, total }: Props) => {
  const percent = total ? (taken / total) * 100 : 0;

  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-sm font-medium mb-2">
          Progress ({taken}/{total})
        </p>

        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
};
